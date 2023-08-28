import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { Badge } from 'antd'
import { BellFilled } from '@ant-design/icons'

import { storage } from '@utils/storage'

import { isVaildTokenHttpApi } from '@api/http/url/account/token'
import { getUnreadInformTotalsHttpApi } from '@api/http/url/get/inform/unread/totals'
import { websocket } from '@api/socket/connect'
import { proxyHomeSocketByOnApi } from '@api/socket/events/on/home'

import type { PanelContent } from '@components/Panel/interface'

import './index.less'

/** 顶部Header栏 */
const Header: PanelContent = ({ isContentShow }) => {
    const avatar = storage.get('react_im_user_avatar')
    const nickname = storage.get('react_im_user_nickname')
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        // 建立ws连接
        isVaildTokenHttpApi()({ succeed: { func: websocket.connection } })
        // 获取未读通知总数
        getUnreadInformTotalsHttpApi()({ succeed: { func: (count) => setCount(count) } })
        // 接管ws
        proxyHomeSocketByOnApi.unreadTotals.inform = (totals) => setCount(totals)
    }, [])
    return (
        <div className={`im-panel-header ${isContentShow ? 'im-panel-header-bounce-s' : 'im-panel-header-bounce-h'}`}>
            <Link to="/settings" className="im-p-h-avatar">
                <img className="im-img-avatar-radius" src={avatar} />
            </Link>
            <p className="im-p-h-nickname">{nickname}</p>
            <Badge size="small" count={count}>
                <span className="im-p-h-unread-inform" title="未读通知" onClick={() => navigate('/inform/homeUnread')}>
                    <BellFilled />
                </span>
            </Badge>
        </div>
    )
}

export default Header
