import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import FriendsCircleListContent from '@components/FriendsCircleListContent'

import Header from '@pages/FriendsCircleSingle/Header'
import Lock from '@pages/FriendsCircleSingle/Lock'

import { storage } from '@utils/storage'

import { getFriendsCircleVisitorLimitHttpApi } from '@api/http/url/get/friendsCircle/visitorLimit'
import { getFriendsCircleSingleListContentHttpApi } from '@api/http/url/get/friendsCircle/singleListContent'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getFriendRelationsHttpApi } from '@api/http/url/get/friend/relations'
import { getFriendsCircleRoleHttpApi } from '@api/http/url/get/friendsCircle/role'
import { getFriendsCircleBackgroundHttpApi } from '@api/http/url/get/friendsCircle/background'
import { getAvatarHttpApi } from '@api/http/url/get/account/avatar'
import { addFriendsCicleVisitorHttpApi } from '@api/http/url/add/friendsCircle/visitor'

import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'
import type { FriendsCircleSingleRole } from './interface'

import './index.less'

const uid = storage.get('react_im_user_id')

/** 某位用户的朋友圈(例如A的朋友圈、B的朋友圈) */
const Single = () => {
    // 对方朋友圈的权限
    const [role, setRole] = useState<FriendsCircleSingleRole>('private')
    // 朋友圈主页背景图
    const [bg, setBg] = useState('')
    // 朋友圈访客
    const [visitorLimit, setVisitorLimit] = useState<number | null>(0)
    // 朋友圈说说列表
    const [list, setList] = useState<FriendsCircleContent[]>([])
    // 头像
    const [avatar, setAvatar] = useState('')
    // 昵称
    const [nickname, setNickname] = useState('')
    // 标题的加载动画(只要朋友圈列表能够成功获取到，就取消加载动画)
    const [loading, setLoading] = useState(true)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const oid = pathname.split('/')[2]
    // 朋友圈说说列表
    const getList = () =>
        getFriendsCircleSingleListContentHttpApi(oid)({
            succeed: { func: (list) => setList(list) },
            failed: { func: () => message({ title: '朋友圈主页获取失败' }) },
            // 取消标题的加载动画
            finally: () => setLoading(false)
        })
    useEffect(() => {
        Promise.all([getFriendRelationsHttpApi(oid)(), getFriendsCircleRoleHttpApi(oid)()]).then(([relation, role]) => {
            const isFriend = !!Number(relation.data)
            // 如果是自己的朋友圈
            if (oid === uid) return setRole('self')
            // 仅好友可见
            if (role.data === 'friend') return setRole(isFriend ? 'friend' : 'stranger')
            setRole(role.data)
        })
        getNicknameHttpApi(oid)({ succeed: { func: (nickname) => setNickname(nickname) } })
        // 获取朋友圈主页背景图
        getFriendsCircleBackgroundHttpApi(oid)({ succeed: { func: (bg) => setBg(bg) } })
        // 访客记录
        getFriendsCircleVisitorLimitHttpApi(oid)({ succeed: { func: (limit) => setVisitorLimit(limit) } })
        // 头像
        getAvatarHttpApi(oid)({ succeed: { func: (avatar) => setAvatar(avatar) } })
        getList()
        // 增加一条访问记录
        uid !== oid && addFriendsCicleVisitorHttpApi(oid)()
    }, [])
    return (
        <>
            <Sideslip
                title={`${uid === oid ? '我的' : nickname ? `${nickname}的` : ''}朋友圈`}
                nextTitle={{
                    title: '更多',
                    next: () => navigate(`${pathname}/more`, { state: { oid, nickname, bg } })
                }}
                isHeaderFloat={true}
                isPadding={false}
                isLoading={loading}>
                <Header
                    url={{ bg, avatar }}
                    limit={{ content: list.length, visitors: visitorLimit !== null ? visitorLimit : '无权限' }}
                    nickname={nickname}
                />
                <div className="im-panel-friends-circle-single-list">
                    {role === 'private' ? (
                        <Lock role="自己" />
                    ) : role === 'stranger' ? (
                        <Lock role="好友" />
                    ) : (
                        <FriendsCircleListContent list={list} actionCb={getList} />
                    )}
                </div>
            </Sideslip>
            <Outlet />
        </>
    )
}

export default Single
