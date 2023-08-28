import { useState, useEffect, forwardRef, useImperativeHandle, memo } from 'react'

import { message as antdMessage } from 'antd'

import { message } from '@components/Message'

import Private from '@pages/Room/Chat/Private'
import Groups from '@pages/Room/Chat/Groups'

import { useEventCallback } from '@hooks'

import { timeUtils } from '@utils/time'
import { arrayMethods } from '@utils/arrayMethods'
import { storage } from '@utils/storage'

// 通用Http Api
import { getAliasHttpApi } from '@api/http/url/get/nickname/alias'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
// 私聊Http Api
import { getIsEqualByRelationsHttpApi } from '@api/http/url/get/friend/isEqualByRelations'
import { getLifeStateHttpApi } from '@api/http/url/get/friend/lifeState'
import { getPrivateHistoryMsgHttpApi } from '@api/http/url/get/message/friend'
import { sendPrivateUnreadMsgStateHttpApi } from '@api/http/url/send/private/state'
// 群聊Http Api
import { getGroupsHistoryMsgHttpApi } from '@api/http/url/get/message/groups'
import { getGroupchatBanTimeHttpApi } from '@api/http/url/get/groupchat/banTime'
import { getGroupchatMemberCountsHttpApi } from '@api/http/url/get/groupchat/memberCounts'
import { changeGroupsUnreadMsgStateHttpApi } from '@api/http/url/send/groups/state'

// Socket Api
import { proxyRoomMessageSocketByOnApi } from '@api/socket/events/on/message'

import type { FC, ForwardedRef, ReactNode } from 'react'

import type { ImperativeMessageHandleType } from '@pages/Room/Layout/Body/interface'
import type { RoomMessage } from '@api/socket/events/on/message/interface'
import type { RoomMessageHandleByBody } from '@pages/Room/interface'
import type { ChatRoomMessageType, MapChatType } from './interface'

const uid = storage.get('react_im_user_id')

/** 负责私聊、群聊消息时的逻辑处理，但不负责UI的渲染 */
const MapChat: FC<MapChatType> = forwardRef(
    (props, ref: ForwardedRef<ImperativeMessageHandleType & RoomMessageHandleByBody>) => {
        const { oid: id, setHeader, setScrollPosition, setAllow, idType } = props
        // 历史记录消息
        const [historyMessage, setHistoryMessage] = useState<ChatRoomMessageType[]>([])
        // 控制浮层是否展示(根据消息id控制)
        const [curMsgId, setCurMsgId] = useState(0)
        // 对方昵称
        const [nickname, setNickname] = useState('')
        // 决定滚动条是否置底
        const [isScrollBar, setIsScrollBar] = useState(true)
        /** 根据页数获取历史消息 */
        const renderHistoryMsg = (page = 1) => {
            // 根据id的类型去获取消息
            const getMsgApi = idType === 'uid' ? getPrivateHistoryMsgHttpApi : getGroupsHistoryMsgHttpApi
            return new Promise<ReactNode>((r) => {
                getMsgApi({ id, page })({
                    succeed: {
                        func: (preHistoryMsg) => {
                            // 如果不是第一页消息，那么滚动条不应该置底
                            setIsScrollBar(page === 1 ? true : false)
                            if (!preHistoryMsg.length) return r(`与${nickname}的历史消息已全部展现`)
                            // 根据消息id进行去重(避免页数之间的消息衔接有重复)
                            setHistoryMessage(arrayMethods.uniqueItem([...preHistoryMsg, ...historyMessage], 'time'))
                            r(null)
                        }
                    },
                    failed: { func: () => message({ title: `与${nickname}的消息获取失败` }) }
                })
            })
        }
        /** 接收由socket传来的消息 */
        const renderSocketMessage = useEventCallback(
            ({ del, isReconnection, data }: RoomMessage<ChatRoomMessageType[]>) => {
                // 是否是推来的撤回消息
                if (del) {
                    // 负责在新数据中找出当前撤回的消息
                    const _delMsg = () => data.find((m) => m.time === del.time)!
                    // 在视图中将被撤回的消息进行替换
                    const map = historyMessage.map((m) => (m.time !== del.time ? m : { ...m, ..._delMsg() }))
                    const m = isReconnection ? arrayMethods.uniqueItem(map, 'time') : map
                    // 渲染新视图
                    setHistoryMessage(m as any)
                } else {
                    // 如果不是撤回的消息，则直接追加新消息即可
                    const _m = [...historyMessage, ...data]
                    const m = isReconnection ? arrayMethods.uniqueItem(_m, 'time') : _m
                    setHistoryMessage(m)
                }
                // 告知服务端，当前正在发送的消息状态为已读
                idType === 'uid'
                    ? sendPrivateUnreadMsgStateHttpApi(id)()
                    : changeGroupsUnreadMsgStateHttpApi({ id, time: Number(new Date()) })()
                // 滚动条置底
                setIsScrollBar(true)
            }
        )
        const getCurMsgId = useEventCallback(() => curMsgId)
        /** 按页数请求数据，页数由上拉加载组件传入 */
        useImperativeHandle(ref, () => ({
            getCurMsgId,
            setCurMsgId,
            pageSize: (page) => renderHistoryMsg(page)
        }))
        useEffect(() => {
            // 初始挂载，请求消息
            renderHistoryMsg()
            // 在这里执行一下私聊与群聊的初始任务
            if (idType === 'uid') {
                let _desc = ''
                Promise.all([
                    getAliasHttpApi(id)(),
                    getLifeStateHttpApi(id)(),
                    getIsEqualByRelationsHttpApi(id)()
                ]).then(([title, description, is]) => {
                    setNickname(title.data)
                    setHeader({ title: title.data, description: description.data })
                    _desc = description.data
                    // 进入房间后，判断是否可以向对方发送消息
                    is.data ? setAllow('') : setAllow(`已与${title.data}解除好友关系`)
                })
                // 接管
                proxyRoomMessageSocketByOnApi.private.msg[id] = renderSocketMessage
                proxyRoomMessageSocketByOnApi.private.state.input[id] = ({ data }) =>
                    data.isEnd ? setHeader({ description: _desc }) : setHeader({ description: '对方正在输入中...' })
                return () => {
                    // 取消接管
                    delete proxyRoomMessageSocketByOnApi.private.msg[id]
                    delete proxyRoomMessageSocketByOnApi.private.state.input[id]
                }
            }
            let timerInit = null as any
            let timerWs = null as any
            /** 解除禁言 */
            const relieveBan = () => {
                setAllow('')
                antdMessage.success('禁言已解除')
            }
            Promise.all([
                getNicknameHttpApi(id)(),
                getGroupchatMemberCountsHttpApi({ id })(),
                getGroupchatBanTimeHttpApi({ gid: id, oid: uid })()
            ]).then(([title, counts, time]) => {
                setNickname(title.data)
                setHeader({ title: title.data, description: `${counts.data}人` })
                // 进入房间后，判断是否可以向对方发送消息
                if (time.data) {
                    setAllow(`你已被禁言，${timeUtils.getWholeDate(new Date(time.data))} 时解除`)
                    timerInit = setTimeout(() => relieveBan(), time.data - Number(new Date()))
                } else {
                    setAllow('')
                }
            })
            proxyRoomMessageSocketByOnApi.groups.msg[id] = renderSocketMessage
            proxyRoomMessageSocketByOnApi.groups.state.ban[id] = ({ data: { time } }) => {
                clearTimeout(timerWs)
                if (!time) return relieveBan()
                timerWs = setTimeout(() => relieveBan(), time)
                antdMessage.success('你已被禁言')
                setAllow(`你已被禁言，${timeUtils.getWholeDate(Number(new Date()) + time)} 时解除`)
            }
            return () => {
                delete proxyRoomMessageSocketByOnApi.groups.msg[id]
                delete proxyRoomMessageSocketByOnApi.groups.state.ban[id]
                clearTimeout(timerInit)
                clearTimeout(timerWs)
            }
        }, [])
        useEffect(() => {
            // 历史记录消息变化时，对滚动条置底
            if (isScrollBar) setScrollPosition()
        }, [historyMessage])
        const Chat = idType === 'uid' ? Private : Groups
        return <Chat id={id} curMsgId={curMsgId} setCurMsgId={setCurMsgId} historyMessage={historyMessage as any} />
    }
)

export default memo(MapChat)
