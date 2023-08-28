import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Input } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'

import { createGroupchatRequestHttpApi } from '@api/http/url/add/request/groupchat'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'

/** 添加群聊 */
const Add = () => {
    // 群聊昵称
    const [nickname, setNickname] = useState('')
    // 验证消息
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    /** 提交前对格式进行验证 */
    const before = useEventCallback(() =>
        appRules.contentLimit['2_15'](msg) ? true : message({ title: '验证消息的内容不在2~15字符之间' })
    )
    const add = useEventCallback(() =>
        createGroupchatRequestHttpApi.api({ id, msg })({
            succeed: {
                func: () =>
                    message({
                        title: '入群申请已发出，请耐心等待审核',
                        options: [{ text: '我知道了', click: () => navigate(-1) }]
                    })
            },
            failed: { func: (title) => message({ title }) }
        })
    )
    const msgList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        bordered={false}
                        autoSize={{ minRows: 2, maxRows: 3 }}
                        maxLength={30}
                        value={msg}
                        onChange={(ev) => setMsg(ev.target.value)}
                    />
                ),
                description: `现有${msg.length}字`
            }
        ],
        [msg]
    )
    const list = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={createGroupchatRequestHttpApi.url}
                        disabled="发送入群申请"
                        before={before}
                        api={add}
                        loading={{ children: '发送中' }}>
                        现在发送申请
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    useEffect(() => {
        getNicknameHttpApi(id)({ succeed: { func: (nickname) => setNickname(nickname) } })
    }, [])
    return (
        <Sideslip title="加入群聊" preTitle={{ title: nickname }} isForward={false}>
            <CommonRow title="输入验证消息作为审核条件" list={msgList} />
            <CommonRow list={list} comment="在被拒绝的情况下，24小时之内只能向该群发送一条入群申请" />
        </Sideslip>
    )
}

export default Add
