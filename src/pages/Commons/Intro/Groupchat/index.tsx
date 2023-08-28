import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { Button } from 'antd'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import { previewImg } from '@components/PreviewImg'
import ShowHomePageTags from '@components/ShowHomePageTags'

import { timeUtils } from '@utils/time'
import { defaultGroupchatInfo } from './utils/defaultInfo'
import { routeRedirect } from './utils/routeRedirect'

import { getIntroByGroupchatRelationHttpApi } from '@api/http/url/get/intro/groupchat'

import type { IntroGroupchat } from '@api/http/url/get/intro/groupchat/interface'

/** 群聊主页 */
const Groupchat = () => {
    // 群聊信息
    const [groupchat, setGroupchat] = useState<IntroGroupchat>({ ...defaultGroupchatInfo })
    // 标题加载动画
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = pathname.split('/')[2]
    useEffect(() => {
        // 获取群聊主页资料
        getIntroByGroupchatRelationHttpApi(id)({
            succeed: { func: (groupchat) => setGroupchat(groupchat) },
            failed: { func: () => message({ title: '群聊主页获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    const _relation = (
        <>
            <Button type="default" onClick={() => navigate(`/shareHomePage/${groupchat.info.id}`)}>
                分享主页
            </Button>
            <Button type="primary">
                <Link to={`/message/${groupchat.info.id}`}>进群畅聊</Link>
            </Button>
        </>
    )
    const groupchatRelation = useMemo(
        () => ({
            stranger: (
                <>
                    <Button type="default" onClick={() => navigate(`/shareHomePage/${groupchat.info.id}`)}>
                        分享主页
                    </Button>
                    <Button type="primary" onClick={() => navigate(`/groupchat/add/${groupchat.info.id}`)}>
                        加入群聊
                    </Button>
                </>
            ),
            host: _relation,
            admins: _relation,
            commons: _relation
        }),
        [groupchat]
    )
    const hostList = useMemo(
        () => [
            {
                text: groupchat.info.host.nickname,
                icon: <img className="im-img-avatar-radius" src={groupchat.info.host.avatar} />,
                to: { pathname: `/intro/${groupchat.info.host.id}` },
                more: true
            }
        ],
        [groupchat]
    )
    const createTimeComment = useMemo(
        () => `${groupchat.info.time ? `创建于${timeUtils.getDate(groupchat.info.time)}` : ''}`,
        [groupchat]
    )
    return (
        <Sideslip
            nextTitle={{ title: '更多', next: () => navigate(routeRedirect[groupchat.type](id)) }}
            isHeaderFloat={true}
            isPadding={false}
            isLoading={loading}>
            <div className="im-panel-intro-container">
                <div
                    className="im-p-i-c-cover"
                    style={{ backgroundImage: `url('${groupchat.info.background}')` }}
                    onClick={() => previewImg({ url: groupchat.info.background })}
                />
                <div className="im-p-i-c-shade" />
            </div>
            <div className="im-panel-intro-basis-info">
                <div className="im-p-i-b-i-header">
                    <div className="im-p-i-b-i-h-avatar">
                        <img src={groupchat.info.avatar} onClick={() => previewImg({ url: groupchat.info.avatar })} />
                    </div>
                    <p className="im-p-i-b-i-h-acc">
                        <span className="im-p-i-b-i-h-acc-id">ID：{groupchat.info.id}</span>
                    </p>
                </div>
                <p className="im-panel-intro-nickname">
                    <ShowHomePageTags tags={groupchat.info.tags} />
                    {groupchat.info.nickname}
                </p>
                <div className="p-intro-basis-info">
                    <CommonRow title={`群主(${createTimeComment})`} list={hostList} />
                    {groupchat.info.signature ? (
                        <CommonRow title="群简介" list={[{ text: groupchat.info.signature, more: false }]} />
                    ) : null}
                </div>
            </div>
            <div className="im-panel-intro-way">{groupchatRelation[groupchat.type]}</div>
        </Sideslip>
    )
}

export default Groupchat
