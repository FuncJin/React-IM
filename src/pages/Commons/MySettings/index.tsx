import { useState, useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'

import { storage } from '@utils/storage'

import { getRankHttpApi } from '@api/http/url/get/account/rank'
import { getUserBindMailHttpApi } from '@api/http/url/get/mail/bind'

const uid = storage.get('react_im_user_id')
const avatar = storage.get('react_im_user_avatar')

/** 与我相关(我的设置) */
const MySettings = () => {
    // 当前等级
    const [curRank, setCurRank] = useState('')
    // 当前邮箱
    const [curMail, setCurMail] = useState('')
    /** 账号等级 */
    const rank = useMemo(
        () => [
            {
                text: '账号等级',
                description: curRank,
                icon: <img className="im-img-avatar-radius" src={avatar} />,
                to: { pathname: '/settings/rankDetails' },
                more: true
            }
        ],
        [curRank]
    )
    /** 主题样式 */
    const themeStyle = useMemo(() => [{ text: '主题样式', to: { pathname: '/settings/style' }, more: true }], [])
    /** 与用户相关的一些账号信息 */
    const userInfo = useMemo(
        () => [
            { text: '生活状态', to: { pathname: '/settings/lifeState' }, border: false, more: true },
            { text: '输入状态', to: { pathname: '/settings/privateMsgInputState' }, more: true },
            { text: '拍一拍文案', to: { pathname: '/settings/patted' }, border: false, more: true },
            { text: '消息撤回文案', to: { pathname: '/settings/delMsgCopywriting' }, more: true },
            { text: '我的主页', to: { pathname: `/intro/${uid}` }, more: true }
        ],
        []
    )
    /** 与用户朋友圈相关的一些信息 */
    const friendsCircle = useMemo(
        () => [
            { text: '可见范围', to: { pathname: '/settings/sectionTime' }, border: false, more: true },
            { text: '谁可访问我的朋友圈', to: { pathname: '/settings/role' }, more: true },
            { text: '我的朋友圈', to: { pathname: `/friendsCircle/${uid}` }, more: true }
        ],
        []
    )
    /** 与平台相关的信息 */
    const system = useMemo(
        () => [
            { text: '主页标签', to: { pathname: '/settings/homePageTagDetails' }, more: true },
            { text: '反馈渠道', to: { pathname: '/settings/feedback' }, border: false, more: true },
            { text: '版本历史记录', to: { pathname: '/settings/versions' }, more: true },
            { text: '新手引导', to: { pathname: '/settings/noviceGuide' }, more: true }
        ],
        []
    )
    /** 平台通知 */
    const systemInform = useMemo(
        () => [{ text: '平台通知（站内信）', to: { pathname: '/settings/systemInform' }, more: true }],
        []
    )
    /** 知己相逢 */
    const soulmateEncounters = useMemo(
        () => [{ text: '知己相逢', to: { pathname: '/settings/soulmateEncounters' }, more: true }],
        []
    )
    /** 与用户账号相关的操作 */
    const accounts = useMemo(
        () => [
            { text: '找回密码', to: { pathname: '/settings/retrievePwd' }, border: false, more: true },
            { text: '修改密码', to: { pathname: '/settings/changePwd' }, more: true },
            { text: '注销账号', to: { pathname: '/settings/logout' }, more: true },
            { text: '退出登录', to: { pathname: '/settings/quitLogin' }, more: true }
        ],
        []
    )
    /** 用户邮箱 */
    const mail = useMemo(
        () => [{ text: '我所绑定的邮箱', description: curMail ? curMail : <LoadingOutlined /> }],
        [curMail]
    )
    useEffect(() => {
        // 获取用户等级
        getRankHttpApi()({
            succeed: { func: (rank) => setCurRank(`${rank}级`) },
            failed: { func: () => message({ title: '等级获取失败' }) }
        })
        // 获取用户绑定的邮箱
        getUserBindMailHttpApi()({
            succeed: { func: (mail) => setCurMail(mail) },
            failed: { func: () => message({ title: '邮箱获取失败' }) }
        })
    }, [])
    return (
        <>
            <Sideslip title="与我相关" preTitle={{ title: '首页' }}>
                <CommonRow list={rank} />
                <CommonRow list={themeStyle} />
                <CommonRow title="修改我的" list={userInfo} />
                <CommonRow title="朋友圈相关" list={friendsCircle} />
                <CommonRow title="使用中遇到了问题？" list={system} />
                <CommonRow title="账号相关" list={accounts} />
                <CommonRow list={systemInform} />
                <CommonRow list={soulmateEncounters} />
                <CommonRow list={mail} />
            </Sideslip>
            <Outlet />
        </>
    )
}

export default MySettings
