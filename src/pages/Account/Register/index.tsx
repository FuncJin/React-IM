import { useState, useCallback, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Input, Divider, Button, message as antdMessage } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { message } from '@components/Message'
import CountDown from '@components/CountDown'
import TourAxios from '@components/TourAxios'
import Loading from '@components/Loading'

import { useEventCallback } from '@hooks'

import { succeedPass } from '@utils/account/succeedPass'
import { appRules } from '@utils/submitRules'
import { storage } from '@utils/storage'
import { popProtocolTip } from '@utils/account/popProtocolTip'
import { constant } from '@constant'
import { isVaildToken } from '@api/http/utils/isVaildToken'
import { domMethods } from '@utils/dom'

import { registerHttpApi } from '@api/http/url/account/register'
import { verifyCodeByRegisterHttpApi } from '@api/http/url/send/mail/verifyCode/register'

const _token = storage.get('react_im_token')

const bar = [
    [appRules.specific.id, 'id', '你的账号不符合规则', '账号由4-6位纯数字组成'],
    [appRules.specific.mail, 'mail', '邮箱不符合规则'],
    [appRules.specific.mailCode, 'code', '你的邮箱验证码不符合规则']
] as const

/** 注册(账号) */
const Register = () => {
    // 注册信息
    const [acc, setAcc] = useState({ id: '', mail: '', code: '' })
    // 页面加载
    const [pageLoading, setPageLoading] = useState({ state: !!_token, tip: '连接中' })
    // 注册按钮的初始文字
    const [initText, setInitText] = useState('注册')
    const navigate = useNavigate()
    /** 发送注册请求 */
    const submitRequest = useEventCallback(() => {
        setPageLoading({ state: true, tip: '请稍后' })
        return registerHttpApi.api(acc)({
            succeed: {
                func: (res) => {
                    succeedPass({ id: acc.id, ...res })
                    // 注册成功后跳转至联系人页面
                    navigate('/contacts')
                    message({
                        title: '注册成功，欢迎您！',
                        Children: '推荐前往新手引导页以获取更佳体验',
                        options: [
                            { text: '算了，我再想想' },
                            { text: '立即前往', click: () => {}, color: 'red', weight: '700' }
                        ]
                    })
                }
            },
            failed: { isGlobalMessage: 'im' },
            finally: () => setPageLoading({ state: false, tip: '' })
        })
    })
    /** 发送验证码 */
    const sendCode = useEventCallback(async () => {
        // 判断账号格式(账号与密码)
        const _reg = [...bar]
        _reg.pop()
        const isOk = _reg.find((row) => !row[0](acc[row[1]]))
        if (isOk) {
            message({ title: isOk[2] })
            return false
        }
        // 发送验证码
        let result = false
        await verifyCodeByRegisterHttpApi({
            id: acc.id,
            mail: acc.mail
        })({
            succeed: {
                func: () => {
                    message({ title: '验证码已发送' })
                    result = true
                }
            },
            failed: {
                isGlobalMessage: 'im',
                func: () => (result = false)
            }
        })
        return result
    })
    const before = useEventCallback(() => {
        // 判断账号格式(全部)
        const isOk = bar.find((row) => !row[0](acc[row[1]]))
        if (isOk) return message({ title: isOk[2], Children: isOk[3] })
        // 以0开头为平台预留账号，不支持注册
        if (acc.id[0] === '0')
            return message({ title: '该区间尚未开放', Children: '以0开头为平台预留账号，暂不支持注册' })
        // 弹窗协议
        const isProtoOk = storage.get('react_im_illegal_topic_flag_0')
        if (isProtoOk !== 'agree')
            return popProtocolTip('注册须知', () => {
                setInitText('您已知晓并同意，请点此开始注册')
                antdMessage.success('请注册')
            })
        return true
    })
    const formatter = useCallback((time: string) => `${time} s`, [])
    const durClick = useCallback(() => message({ title: '验证码过期后方可重新发送' }), [])
    const loading = useMemo(() => ({ children: '注册中', isHiddenIcon: false }), [])
    const failed = useMemo(() => ({ children: '继续注册' }), [])
    useEffect(() => {
        domMethods.autoChangeBodyBackground()
        // 将协议更改为未读状态
        storage.set('react_im_illegal_topic_flag_0', 'refuse')
        // 检测token状态
        if (_token)
            isVaildToken().then((isOk) => (isOk ? navigate('/contacts') : setPageLoading({ state: false, tip: '' })))
    }, [])
    return (
        <article className="im-p-account">
            {pageLoading.state ? <Loading tip={pageLoading.tip} /> : null}
            <section className="im-p-a-text">
                <p className="im-p-a-t-1">Welcome to</p>
                <p className="im-p-a-t-2">React IM</p>
                <p className="im-p-a-t-3">
                    高山流水遇知音，彩云追月得知己。
                    <br />
                    来这里寻找你的知音吧~
                </p>
            </section>
            <section className="im-p-a-info">
                <div className="im-p-a-i-avatar">
                    <UserOutlined className="im-p-a-i-a-register" />
                </div>
                <form>
                    <Input
                        className="im-p-a-i-id"
                        placeholder="账号"
                        bordered={false}
                        value={acc.id}
                        maxLength={6}
                        onChange={(ev) => setAcc({ ...acc, id: ev.target.value })}
                    />
                    <div className="im-p-a-i-mail">
                        <Input
                            placeholder="邮箱"
                            bordered={false}
                            value={acc.mail}
                            maxLength={320}
                            onChange={(ev) => setAcc({ ...acc, mail: ev.target.value })}
                        />
                        <Button className="im-p-a-i-m-send" type="text">
                            <CountDown
                                text="发送验证码"
                                tip="发送中"
                                endText="重新发送"
                                dur={constant.time.min._3}
                                almostEndSeconds={10}
                                formatter={formatter}
                                durClick={durClick}
                                willStartCounting={sendCode}
                            />
                        </Button>
                    </div>
                    <Input
                        placeholder="邮箱验证码"
                        bordered={false}
                        value={acc.code}
                        maxLength={6}
                        onChange={(ev) => setAcc({ ...acc, code: ev.target.value })}
                    />
                </form>
            </section>
            <section className="im-p-a-footer">
                <Button className="im-p-a-f-btn" type="primary" block>
                    <TourAxios
                        name={registerHttpApi.url}
                        disabled="注册"
                        loading={loading}
                        before={before}
                        failed={failed}
                        api={submitRequest}>
                        {initText}
                    </TourAxios>
                </Button>
                <div>
                    <Divider orientation="center" plain>
                        <p className="im-p-a-f-extends">已有账号？马上登录</p>
                    </Divider>
                    <Button className="im-p-a-f-btn" block>
                        <Link to="/login">登录</Link>
                    </Button>
                </div>
            </section>
        </article>
    )
}

export default Register
