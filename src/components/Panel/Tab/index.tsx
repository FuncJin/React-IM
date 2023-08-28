import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Badge } from 'antd'
import { MessageOutlined, MessageFilled, HomeFilled, HomeOutlined, StarFilled, StarOutlined } from '@ant-design/icons'

import { storage } from '@utils/storage'
import { domMethods } from '@utils/dom'
import { pubsub } from '@utils/pubsub'

import { proxyHomeSocketByOnApi } from '@api/socket/events/on/home'

import type { PanelContent } from '@components/Panel/interface'

import './index.less'

/** 底部Tab栏 */
const Tab: PanelContent = ({ isContentShow }) => {
    // 消息条数
    const [msgLimit, setMsgLimit] = useState(0)
    // 朋友圈红点
    const [isRedDot, setIsRedDot] = useState(false)
    const { pathname } = useLocation()
    useEffect(() => {
        // 当前事件总会在dom挂载与http请求都完成之后被成功触发
        proxyHomeSocketByOnApi.unreadTotals.index = (limit) => {
            // 修改storage
            storage.set('react_im_unread_totals', limit)
            // 修改页面标题
            domMethods.pageVisibility.pageVisibilityState.changeH5PageTitleByHidden()
            // 修改tab栏
            setMsgLimit(limit)
        }
        // 订阅朋友圈红点事件
        pubsub.subscribe('friendsCircleRedDotByTab', (evName, is) => setIsRedDot(is))
    }, [])
    return (
        <ul className={`im-panel-tab ${isContentShow ? 'im-panel-tab-bounce-s' : 'im-panel-tab-bounce-h'}`}>
            <li className="im-p-t-relative">
                <Link to="/message">
                    <div className="im-p-t-r-unreadCount">
                        <Badge size="small" count={msgLimit} />
                    </div>
                    {pathname === '/message' ? <MessageFilled className="im-p-t-highed" /> : <MessageOutlined />}
                </Link>
            </li>
            <li>
                <Link to="/contacts">
                    {pathname === '/contacts' ? <HomeFilled className="im-p-t-highed" /> : <HomeOutlined />}
                </Link>
            </li>
            <li className="im-p-t-relative">
                <Link to="/friendsCircle">
                    <div className="im-p-t-r-red-dot">
                        <Badge size="small" dot={isRedDot} />
                    </div>
                    {pathname === '/friendsCircle' ? <StarFilled className="im-p-t-highed" /> : <StarOutlined />}
                </Link>
            </li>
        </ul>
    )
}

export default Tab
