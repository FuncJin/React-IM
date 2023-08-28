import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import CountDown from '@components/CountDown'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'
import { storage } from '@utils/storage'
import { encode } from '@utils/account/encrypt'
import { constant } from '@constant'

import { verifyCodeByChangePwdHttpApi } from '@api/http/url/send/mail/verifyCode/changePwd'
import { changePwdHttpApi } from '@api/http/url/set/info/user/pwd'

/** 修改密码 */
const ChangePwd = () => {
    // 密码
    const [pwd, setPwd] = useState('')
    // 验证码
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    /** 发送验证码 */
    const sendCode = useEventCallback(async () => {
        if (!appRules.specific.password(pwd)) return message({ title: '新密码不符合规则' })
        // 发送验证码
        let result = false
        await verifyCodeByChangePwdHttpApi()({
            succeed: {
                func: () => {
                    message({ title: '验证码已发送' })
                    result = true
                }
            },
            failed: {
                func: (title) => {
                    message({ title })
                    result = false
                }
            }
        })
        return result
    })
    /** 请求前对格式进行校验 */
    const before = useEventCallback(() => {
        if (!appRules.specific.password(pwd)) return message({ title: '新密码不符合规则' })
        if (!appRules.specific.mailCode(code)) return message({ title: '验证码不符合规则' })
        return true
    })
    /** 发起修改密码的请求 */
    const changePwd = useEventCallback(() =>
        changePwdHttpApi.api({ pwd: encode(pwd), code: Number(code) })({
            succeed: {
                func: (token) => {
                    storage.set('react_im_token', token)
                    message({ title: '密码已修改，请牢记', options: [{ text: '确定', click: () => navigate(-1) }] })
                }
            },
            failed: { func: (title) => message({ title }) }
        })
    )
    const newPwdList = useMemo(
        () => [
            {
                text: (
                    <Input
                        placeholder="输入新密码"
                        bordered={false}
                        maxLength={16}
                        value={pwd}
                        onChange={(ev) => setPwd(ev.target.value)}
                    />
                )
            }
        ],
        [pwd]
    )
    const formatter = useCallback((time: string) => `${time} s`, [])
    const durClick = useCallback(() => message({ title: '验证码过期后方可重新发送' }), [])
    const codeList = useMemo(
        () => [
            {
                text: (
                    <Input
                        placeholder="输入验证码"
                        bordered={false}
                        maxLength={6}
                        value={code}
                        onChange={(ev) => setCode(ev.target.value)}
                    />
                )
            },
            {
                text: (
                    <CountDown
                        text="发送邮箱验证码"
                        tip="发送中"
                        endText="上一个验证码已过期，点此重新发送"
                        dur={constant.time.min._3}
                        almostEndSeconds={10}
                        formatter={formatter}
                        durClick={durClick}
                        willStartCounting={sendCode}
                    />
                )
            }
        ],
        [code]
    )
    const changePwdList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={changePwdHttpApi.url}
                        disabled="修改密码"
                        before={before}
                        api={changePwd}
                        loading={{ children: '正在修改' }}>
                        修改密码
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="修改密码">
            <CommonRow list={newPwdList} comment="密码中只能出现数字、字母、下划线，位数在8~16位之间" />
            <CommonRow list={codeList} comment="验证码默认发送至与该账号所绑定的邮箱中" />
            <CommonRow
                list={changePwdList}
                comment="修改密码后，当前设备不会退出登录。但你如果在其它设备上登录过该账号，则其它设备需要重新登录，请牢记新密码！"
            />
        </Sideslip>
    )
}

export default ChangePwd
