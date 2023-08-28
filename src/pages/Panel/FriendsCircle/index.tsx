import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'

import FriendsCircleListContent from '@components/FriendsCircleListContent'
import HtmlComment from '@components/HtmlComment'
import { message } from '@components/Message'

import { cancelBubble } from '@utils/tools/cancelBubble'
import { pubsub } from '@utils/pubsub'
import { storage } from '@utils/storage'

import { getFriendsCircleListContentHttpApi } from '@api/http/url/get/friendsCircle/listContent'

import { proxyFriendsCircleSocketByOnApi } from '@api/socket/events/on/friendsCircle'

import type { PanelBodyPageType } from '@components/Panel/interface'
import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'

import friendsCircleImgMore from './imgs/friendsCircle_more.png'

import './index.less'

// 初次挂载时，是否正在获取朋友圈
let initLoading = true

// 首页朋友圈红点
const redDot = (list: FriendsCircleContent[]) => {
    if (!list.length) return
    // 最新朋友圈红点时间
    const nextTimestamp = list[0].time
    // 拿出之前的朋友圈红点时间
    const preTimestamp = storage.get('react_im_friendsCircle_red_dot_time')
    const isShow = nextTimestamp > preTimestamp
    pubsub.publish('friendsCircleRedDotByTab', isShow)
    // 存入当前时间
    storage.set('react_im_friendsCircle_red_dot_time', nextTimestamp)
}

/** 朋友圈(我的) */
const FriendsCircle: PanelBodyPageType = forwardRef((props, ref) => {
    // 朋友圈列表
    const [list, setList] = useState<FriendsCircleContent[]>([])
    const navigate = useNavigate()
    // 更新朋友圈列表
    const updateList = (list: FriendsCircleContent[]) => {
        setList(list)
        redDot(list)
    }
    /** 获取当前用户朋友圈 */
    const renderCurUserFriendsCircle = () =>
        getFriendsCircleListContentHttpApi()({
            succeed: { func: (list) => updateList(list) },
            failed: { func: () => message({ title: '朋友圈列表获取失败' }) }
        })
    // 向父组件传递数据
    useImperativeHandle(ref, () => ({ render: renderCurUserFriendsCircle }))
    useEffect(() => {
        renderCurUserFriendsCircle().then(() => (initLoading = false))
        // 接管socket
        proxyFriendsCircleSocketByOnApi.friendsCircleList = (list) => updateList(list)
    }, [])
    return (
        <>
            <HtmlComment>朋友圈</HtmlComment>
            <div className={`im-panel-section ${props.className ? props.className : ''} im-panel-home-friendsCircle`}>
                <div className="im-panel-home-friendsCircle-list">
                    {initLoading ? (
                        <div className="im-p-s-loading">
                            <LoadingOutlined />
                        </div>
                    ) : null}
                    <FriendsCircleListContent list={list} />
                </div>
                <div
                    className="im-p-fc-page-more"
                    onMouseDown={(ev) => {
                        cancelBubble(ev)
                        navigate('/friendsCircle/more')
                    }}>
                    <img src={friendsCircleImgMore} />
                </div>
            </div>
            <Outlet />
        </>
    )
})

export default FriendsCircle
