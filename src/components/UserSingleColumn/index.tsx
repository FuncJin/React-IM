import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from 'antd'

import type { FC } from 'react'

import type { UserSingleColumnType } from './interface'

import './index.less'

/** 单个首页消息、好友、群聊列表的展示 */
const UserSingleColumn: FC<UserSingleColumnType> = ({
    path,
    avatar,
    nickname,
    time,
    text,
    badge,
    isIncNicknameColor
}) => (
    <Link to={path} className="im-user-list-single" draggable={false}>
        <div className="im-u-l-s-avatar">
            <img src={avatar} />
        </div>
        <div className="im-u-l-s-details">
            <div className="im-u-l-s-d-title">
                <span className={`im-u-l-s-d-t-nickname ${isIncNicknameColor ? 'im-u-l-s-d-t-nickname-inc' : ''}`}>
                    {nickname}
                </span>
                <span className="im-u-l-s-d-t-time">{time}</span>
            </div>
            <div className="im-u-l-s-d-info">
                <span className="im-u-l-s-d-i-text">{text}</span>
                {badge ? <Badge size="small" count={badge} /> : null}
            </div>
        </div>
    </Link>
)

export default memo(UserSingleColumn)
