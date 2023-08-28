import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import RankIcons from '@components/RankIcons'
import { previewImg } from '@components/PreviewImg'
import ShowHomePageTags from '@components/ShowHomePageTags'

import IntroWay from '@pages/Commons/Intro/User/IntroWay'
import LikedLimit from '@pages/Commons/Intro/User/LikedLimit'

import { showUserBasisInfo } from './utils/showUserBasisInfo'
import { defaultUserInfo } from './utils/defaultInfo'
import { routeRedirect } from './utils/routeRedirect'

import { getIntroByFriendRelationHttpApi } from '@api/http/url/get/intro/friend'

import type { UserBasisInfo } from './utils/interface'

/** 用户个人主页 */
const User = () => {
    // 对方资料
    const [user, setUser] = useState<UserBasisInfo>({ ...defaultUserInfo })
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    const accRankList = useMemo(() => [{ text: <RankIcons.RankIcons rank={user.info.rank} /> }], [user])
    const basisList = useMemo(
        () => [
            {
                text: showUserBasisInfo({ sex: user.info.sex, age: user.info.age, birthplace: user.info.birthplace }),
                subTitle: user.info.signature
            }
        ],
        [user]
    )
    const friendsCircleList = useMemo(
        () => [{ text: `进入朋友圈`, to: { pathname: `/friendsCircle/${user.info.id}` }, more: true }],
        [user]
    )
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = pathname.split('/')[2]
    useEffect(() => {
        // 获取主页资料
        getIntroByFriendRelationHttpApi(id)({
            succeed: { func: (user) => setUser({ info: user.info, type: user.type } as const) },
            failed: { func: () => message({ title: '主页获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip
            nextTitle={{ title: '更多', next: () => navigate(routeRedirect[user.type](id)) }}
            isHeaderFloat={true}
            isPadding={false}
            isLoading={loading}>
            <div className="im-panel-intro-container">
                <div
                    className="im-p-i-c-cover"
                    style={{ backgroundImage: `url('${user.info.background}')` }}
                    onClick={() => previewImg({ url: user.info.background })}
                />
                <div className="im-p-i-c-shade" />
                <div className="im-p-i-c-liked">
                    <LikedLimit id={id} />
                </div>
            </div>
            <div className="im-panel-intro-basis-info">
                <div className="im-p-i-b-i-header">
                    <div className="im-p-i-b-i-h-avatar">
                        <img src={user.info.avatar} onClick={() => previewImg({ url: user.info.avatar })} />
                    </div>
                    <p className="im-p-i-b-i-h-acc">
                        <span className="im-p-i-b-i-h-acc-id">ID：{user.info.id}</span>
                        {user.info.homeLocation ? `IP: ${user.info.homeLocation}` : null}
                    </p>
                </div>
                <p className="im-panel-intro-nickname">
                    {user.info.nickname}&nbsp;&nbsp;
                    {user.info.alias ? `(${user.info.alias})` : null}
                    <ShowHomePageTags tags={user.info.tags} />
                </p>
                <div className="p-intro-basis-info">
                    <CommonRow title={`账号等级(${user.info.rank})`} list={accRankList} />
                    <CommonRow title="基本信息" list={basisList} />
                    <CommonRow list={friendsCircleList} />
                </div>
            </div>
            <div className="im-panel-intro-way">
                <IntroWay id={user.info.id} type={user.type} />
            </div>
        </Sideslip>
    )
}

export default User
