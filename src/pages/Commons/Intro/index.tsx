import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Slot from '@components/Slot'
import { message } from '@components/Message'
import Loading from '@components/Loading'

import User from './User'
import Groupchat from './Groupchat'

import { getIdTypeHttpApi } from '@api/http/url/account/type/id'

import type { AccountType } from '@api/http/url/interface/account'

import './index.less'

const whichIntro = { uid: User, gid: Groupchat, noid: () => null } as const

/** 主页(用户或群聊) */
const Intro = () => {
    // 账号类型
    const [identity, setIdentity] = useState<AccountType>('noid')
    // 当前账号
    const [id, setId] = useState('')
    // 是否正在跳转中
    const [loading, setLoading] = useState(true)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const reg = /^\/intro\/(?<id>\d{4,6})$/
        const is = reg.test(pathname)
        // 判断路径中的id格式是否正确
        if (!is) return navigate('/404')
        const id = reg.exec(pathname)?.groups?.id
        getIdTypeHttpApi(id!)({
            succeed: {
                func: (identity) => {
                    // 如果是无效id
                    if (identity === 'noid') return navigate(-1)
                    // 否则渲染页面
                    setIdentity(identity)
                    setId(id!)
                }
            },
            failed: {
                func: () => message({ title: '搜索时出错', options: [{ text: '确定', click: () => navigate(-1) }] })
            },
            finally: () => setLoading(false)
        })
    }, [pathname])
    return loading ? (
        <Loading tip="获取中" />
    ) : (
        <Slot key={id} id={id}>
            {whichIntro[identity]}
        </Slot>
    )
}

export default Intro
