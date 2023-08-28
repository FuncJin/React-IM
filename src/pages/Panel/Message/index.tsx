import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import Empty from '@components/Empty'
import HtmlComment from '@components/HtmlComment'
import UserSingleColumn from '@components/UserSingleColumn'
import { message } from '@components/Message'

import { timeUtils } from '@utils/time'
import { storage } from '@utils/storage'

import { getHomeMessageListHttpApi } from '@api/http/url/get/message/home'

import { proxyHomeSocketByOnApi } from '@api/socket/events/on/home'

import type { FC } from 'react'

import type { CustomKeyByObject } from '@interface/type'
import type { PanelBodyPageType } from '@components/Panel/interface'
import type { HomeMessageList } from '@api/http/url/get/message/home/interface'

import pencilImg from './imgs/pencil.png'

// 初次挂载时，是否正在获取消息
let initLoading = true

const Pencil: FC<CustomKeyByObject<'text'>> = ({ text }) => (
    <>
        <img src={pencilImg} />
        {text}
    </>
)

/** 首页消息页面 */
const Message: PanelBodyPageType = forwardRef((props, ref) => {
    // 消息列表
    const [list, setList] = useState<HomeMessageList>({ msg: [], totals: 0 })
    const renderIndexMsg = () =>
        getHomeMessageListHttpApi()({
            succeed: {
                func: (list) => {
                    // 渲染消息列表
                    setList(list)
                    // 渲染未读消息数量(只渲染首页未读消息数即可)
                    proxyHomeSocketByOnApi.unreadTotals.index(list.totals)
                }
            },
            failed: { func: () => message({ title: '获取首页消息列表失败' }) }
        })
    const mapText = (oid: string, row: HomeMessageList['msg'][0]) => {
        // 是否是撤回消息
        if (row.del) return row.del
        const cacheMsg = storage.get('react_im_room_cache_msg_', oid)
        // 上次未发送的消息是否还在有效时间内
        if (!cacheMsg || !cacheMsg.msg || Number(new Date()) >= cacheMsg.time)
            return `${row.type === 'groups' ? `${row.unickname}：` : ''}${row.msg}`
        return <Pencil text={cacheMsg.msg} />
    }
    useImperativeHandle(ref, () => ({ render: renderIndexMsg }))
    useEffect(() => {
        // 第一次挂载message页面时，需要主动去获取一次消息列表
        // 其它时间，服务器会自动通知，而不用客户端主动去询问
        renderIndexMsg().then(() => (initLoading = false))
        // 接管home SocketApi
        proxyHomeSocketByOnApi.message = (list: HomeMessageList) => setList(list)
    }, [])
    return (
        <>
            <HtmlComment>消息列表</HtmlComment>
            <ul className={`im-panel-section im-panel-home-message ${props.className ? props.className : ''}`}>
                {list.msg.map((row) => (
                    <li key={row.time}>
                        <UserSingleColumn
                            path={`/message/${row.id}`}
                            avatar={row.avatar}
                            nickname={row.type === 'private' ? row.unickname : row.gnickname}
                            time={timeUtils.getTime(row.time).tiny}
                            text={mapText(row.id, row)}
                            badge={row.totals}
                        />
                    </li>
                ))}
                {initLoading ? (
                    <div className="im-p-s-loading">
                        <LoadingOutlined />
                    </div>
                ) : null}
                {initLoading ? null : list.msg.length ? null : <Empty feedback="暂无消息" type="message" />}
            </ul>
        </>
    )
})

export default Message
