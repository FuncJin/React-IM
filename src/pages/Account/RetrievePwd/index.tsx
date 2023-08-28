import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from 'antd'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'
import { domMethods } from '@utils/dom'

import { resetPwdHttpApi } from '@api/http/url/set/account/resetPwd'

const bar = [
    [appRules.specific.id, '账号不符合规则', '若不慎遗忘账号，请联系管理员获得帮助。'],
    [appRules.specific.mail, '邮箱不符合规则']
] as const

/** 检查格式 */
const isErr = (_bar: string[]) => {
    const errIdx = _bar.findIndex((text, idx) => !bar[idx][0](text))
    if (errIdx > -1) return bar[errIdx]
}

/** 找回密码(重置密码) */
const RetrievePwd = () => {
    const [id, setId] = useState('')
    const [mail, setMail] = useState('')
    const navigate = useNavigate()
    const before = useEventCallback(() => {
        const isOk = isErr([id, mail])
        if (isOk) return message({ title: isOk[1], Children: isOk[2] })
        return true
    })
    /** 发送重置密码的请求 */
    const resetPwd = useEventCallback(() =>
        resetPwdHttpApi.api({ id, mail })({
            succeed: {
                func: () =>
                    message({
                        title: mail,
                        Children: '携带新密码的邮件已发送至该邮箱，请注意查收',
                        options: [{ text: '确定', click: () => navigate('/login') }]
                    })
            },
            failed: { isGlobalMessage: 'im' }
        })
    )
    useEffect(() => {
        domMethods.autoChangeBodyBackground()
    }, [])
    const loading = useMemo(() => ({ children: '重置中' }), [])
    const accList = useMemo(
        () => [{ text: <Input maxLength={6} bordered={false} value={id} onChange={(ev) => setId(ev.target.value)} /> }],
        [id]
    )
    const mailList = useMemo(
        () => [{ text: <Input bordered={false} value={mail} onChange={(ev) => setMail(ev.target.value)} /> }],
        [mail]
    )
    const resetList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={resetPwdHttpApi.url}
                        disabled="重置密码"
                        before={before}
                        api={resetPwd}
                        loading={loading}>
                        重置密码
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    const resetComment = useMemo(() => `填写完成后，你会收到一封携带该账号${id ? `(${id})` : ''}新密码的邮件`, [id])
    return (
        <Sideslip title="找回密码">
            <CommonRow title="1.要找回密码的账号" list={accList} />
            <CommonRow title="2.该账号所绑定的邮箱" list={mailList} />
            <CommonRow list={resetList} comment={resetComment} />
        </Sideslip>
    )
}

export default RetrievePwd
