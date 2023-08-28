import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Input } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'

import { createFriendRequestHttpApi } from '@api/http/url/add/request/friend'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getFriendsListNameHttpApi } from '@api/http/url/get/account/friendsListName'

/** 添加好友 */
const Add = () => {
    // 好友分组下标
    const [groupsIdx, setGroupsIdx] = useState(0)
    // 备注
    const [alias, setAlias] = useState('')
    // 验证消息
    const [msg, setMsg] = useState('')
    // 自己的好友列表
    const [friendList, setFriendList] = useState([] as string[])
    // 对方昵称
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    useEffect(() => {
        getFriendsListNameHttpApi()({
            succeed: { func: (list) => setFriendList(list) },
            finally: () => setLoading(false)
        })
        getNicknameHttpApi(id)({ succeed: { func: (nickname) => setNickname(nickname) } })
    }, [])
    const before = useEventCallback(() => {
        if (alias.length > 7)
            return message({
                title: '你输入的内容过长，不能超过7个字符',
                options: [{ text: '我知道了' }],
                Children: `已超过${alias.length - 7}字符`
            })
        if (!appRules.contentLimit['2_15'](msg))
            return message({
                title: '格式不符合规则',
                Children: '验证消息不在2~15字符之间'
            })
        return true
    })
    const add = useEventCallback(() =>
        createFriendRequestHttpApi.api({ id, groups: friendList[groupsIdx], alias, msg })({
            succeed: {
                func: () =>
                    message({
                        title: `已向${nickname}(${id})发出好友申请，请耐心等待对方同意`,
                        options: [{ text: '我知道了', click: () => navigate(-1) }]
                    })
            },
            failed: { func: (title) => message({ title }) }
        })
    )
    const groupsNameList = useMemo(
        () => friendList.map((text, idx) => ({ text, click: () => setGroupsIdx(idx) })),
        [friendList]
    )
    const aliasList = useMemo(
        () => [
            {
                text: (
                    <Input bordered={false} value={alias} onChange={(ev) => setAlias(ev.target.value)} maxLength={7} />
                )
            }
        ],
        [alias]
    )
    const msgList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        bordered={false}
                        autoSize={{ minRows: 2 }}
                        maxLength={30}
                        value={msg}
                        onChange={(ev) => setMsg(ev.target.value)}
                    />
                )
            }
        ],
        [msg]
    )
    const sendList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={createFriendRequestHttpApi.url}
                        disabled="发送好友申请"
                        api={add}
                        before={before}
                        resend={{
                            is: true,
                            feedback: () => message({ title: '24小时之内，不可向该用户再次发出申请' })
                        }}
                        loading={{
                            children: '正在发送好友申请',
                            feedback: () => message({ title: '正在发送上次好友申请，请耐心等待' })
                        }}
                        failed={{ children: '发送失败，请重试' }}>
                        发送此好友申请
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="添加好友" preTitle={{ title: nickname }} isLoading={loading}>
            <CommonRow title="选择分组" selected={groupsIdx} list={groupsNameList} />
            <CommonRow title="好友备注" list={aliasList} />
            <CommonRow title="验证消息（必填）" list={msgList} />
            <CommonRow list={sendList} comment="在被拒绝的情况下，24小时之内只能向该用户发送一条好友申请" />
        </Sideslip>
    )
}

export default Add
