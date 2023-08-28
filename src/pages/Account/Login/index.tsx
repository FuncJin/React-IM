import { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Divider, Input, message as antdMessage } from 'antd'

import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'
import Loading from '@components/Loading'

import { useEventCallback } from '@hooks'

import { constant } from '@constant'
import { appRules } from '@utils/submitRules'
import { storage } from '@utils/storage'
import { succeedPass } from '@utils/account/succeedPass'
import { encode } from '@utils/account/encrypt'
import { popProtocolTip } from '@utils/account/popProtocolTip'
import { isVaildToken } from '@api/http/utils/isVaildToken'
import { domMethods } from '@utils/dom'

import { loginHttpApi } from '@api/http/url/account/login'

const _token = storage.get('react_im_token')

/** 登录 */
const Login = () => {
    // 当前输入的账号与密码
    const [acc, setAcc] = useState({ id: '', password: '' })
    // 页面加载
    const [pageLoading, setPageLoading] = useState({ state: !!_token, tip: '连接中' })
    // 登录按钮的初始文字
    const [initText, setInitText] = useState('登录')
    const navigate = useNavigate()
    // 头像回填
    const avatar = storage.get('react_im_user_avatar') || constant.env.default.avatar
    /** 发送登录请求 */
    const submitRequest = useEventCallback(() => {
        setPageLoading({ state: true, tip: '请稍后' })
        return loginHttpApi.api({ ...acc, password: encode(acc.password) })({
            succeed: {
                func: (res) => {
                    succeedPass({ id: acc.id, ...res })
                    navigate('/message')
                }
            },
            failed: { isGlobalMessage: 'im' },
            finally: () => setPageLoading({ state: false, tip: '' })
        })
    })
    const before = useEventCallback(() => {
        if (!acc.id.length) return message({ title: '你还没有输入账号' })
        if (!acc.password.length) return message({ title: '你还没有输入密码' })
        if (!appRules.specific.id(acc.id))
            return message({ title: '账号不符合规则', Children: '账号由4-6位纯数字组成' })
        if (!appRules.specific.password(acc.password))
            return message({ title: '密码不符合规则', Children: '密码由数字或字母或下划线组成，长度为8-16字符' })
        // 弹窗协议
        const isProtoOk = storage.get('react_im_illegal_topic_flag_0')
        if (isProtoOk !== 'agree')
            return popProtocolTip('登录须知', () => {
                setInitText('您已知晓并同意，请点此登录')
                antdMessage.success('请登录')
            })
        return true
    })
    const loading = useMemo(() => ({ children: '登录中', isHiddenIcon: false }), [])
    const failed = useMemo(() => ({ children: '重新登录' }), [])
    useEffect(() => {
        domMethods.autoChangeBodyBackground()
        // 账号回填
        const id = storage.get('react_im_user_id')
        if (id) setAcc({ ...acc, id })
        // 将协议更改为未读状态
        storage.set('react_im_illegal_topic_flag_0', 'refuse')
        // 检测token状态
        if (_token)
            isVaildToken().then((isOk) => (isOk ? navigate('/message') : setPageLoading({ state: false, tip: '' })))
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
                    社交，从现在开始
                </p>
            </section>
            <section className="im-p-a-info">
                <div className="im-p-a-i-avatar">
                    <img src={avatar} alt="avatar" />
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
                    <Input
                        type="password"
                        placeholder="密码"
                        bordered={false}
                        value={acc.password}
                        maxLength={16}
                        onChange={(ev) => setAcc({ ...acc, password: ev.target.value })}
                    />
                </form>
            </section>
            <section className="im-p-a-footer">
                <Button className="im-p-a-f-btn" type="primary" block>
                    <TourAxios
                        name={loginHttpApi.url}
                        disabled="登录"
                        before={before}
                        api={submitRequest}
                        loading={loading}
                        failed={failed}>
                        {initText}
                    </TourAxios>
                </Button>
                <div>
                    <Divider orientation="center" plain>
                        <p className="im-p-a-f-extends">
                            <span className="im-p-a-f-e-retrieve-pwd">
                                <Link to="/retrievePwd">找回密码</Link>
                            </span>
                            <br />
                            没有账号？立即注册
                        </p>
                    </Divider>
                    <Button className="im-p-a-f-btn" block>
                        <Link to="/register">注册</Link>
                    </Button>
                </div>
            </section>
        </article>
    )
}

export default Login
