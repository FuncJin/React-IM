import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, message as antdMessage } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'
import CountDown from '@components/CountDown'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'
import { appRules } from '@utils/submitRules'
import { encode } from '@utils/account/encrypt'
import { constant } from '@constant'

import { verifyCodeByLogoutHttpApi } from '@api/http/url/send/mail/verifyCode/logout'
import { logoutHttpApi } from '@api/http/url/account/logout'

import { websocket } from '@api/socket/connect'

/** 注销(账号) */
const Logout = () => {
    // 密码
    const [pwd, setPwd] = useState('')
    // 注销的原因
    const [reason, setReason] = useState('')
    // 验证码
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    /** 发送验证码 */
    const sendCode = useEventCallback(async () => {
        if (!appRules.specific.password(pwd)) return message({ title: '密码不符合规则' })
        // 发起请求
        let result = false
        await verifyCodeByLogoutHttpApi()({
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
    /** 请求前对格式进行验证 */
    const before = useEventCallback(() => {
        if (!appRules.specific.password(pwd)) return message({ title: '密码不符合规则' })
        if (!appRules.specific.mailCode(code)) return message({ title: '验证码不符合规则' })
        return true
    })
    /** 发送注销请求 */
    const logout = useEventCallback(() =>
        logoutHttpApi.api({ pwd: encode(pwd), code, reason: reason ? reason : '无' })({
            succeed: {
                func: (title) => {
                    // 移除本地一些必需token
                    storage.remove('react_im_token')
                    storage.remove('react_im_auto_theme')
                    storage.remove('react_im_cur_theme_scheme_order')
                    storage.remove('react_im_common_emoji')
                    storage.remove('react_im_pc_home_background')
                    storage.remove('react_im_illegal_topic_flag_0')
                    // 跳转至首页
                    navigate('/')
                    websocket.close()
                    antdMessage.success(title)
                }
            },
            failed: { func: (title) => message({ title }) }
        })
    )
    const pwdList = useMemo(
        () => [
            {
                text: (
                    <Input
                        placeholder="密码"
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
                        placeholder="验证码"
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
    const reasonList = useMemo(
        () => [
            {
                text: (
                    <Input
                        placeholder="原因"
                        bordered={false}
                        maxLength={50}
                        value={reason}
                        onChange={(ev) => setReason(ev.target.value)}
                    />
                )
            }
        ],
        [reason]
    )
    const logoutList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={logoutHttpApi.url}
                        disabled="注销"
                        before={before}
                        api={logout}
                        loading={{ children: '正在注销' }}>
                        注销
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="注销账号">
            <CommonRow title="1.在注销前需要输入密码来确定身份" list={pwdList} />
            <CommonRow title="2.需要邮箱验证码再次确定身份。验证码默认发送至与该账号所绑定的邮箱中" list={codeList} />
            <CommonRow title="3.要留下注销此账号的原因吗？以方便开发者对此平台进行优化或迭代" list={reasonList} />
            <CommonRow
                title="4.开始注销"
                list={logoutList}
                comment="开始注销后的14天内，若你在任意设备再次登录了该账号，则注销流程会因此停止，届时，你还会再次拥有该账号，请悉知。若未在14天内登录该账号，则该账号中的所有数据会随着注销冷却期的结束而被全部清空，包括但不仅限于好友、群聊列表、朋友圈等"
            />
        </Sideslip>
    )
}

export default Logout
