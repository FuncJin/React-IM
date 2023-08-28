import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from 'antd'

import type { FC } from 'react'

import type { IntroWayType } from './interface'

/** 用户Intro页面的底部按钮展示(根据不同的好友关系展示不同的Tab栏) */
const IntroWay: FC<IntroWayType> = ({ id, type }) => {
    const navigate = useNavigate()
    const relations = {
        stranger: (
            <>
                <Button type="default" onClick={() => navigate(`/shareHomePage/${id}`)}>
                    分享主页
                </Button>
                <Button type="primary" onClick={() => navigate(`/friends/add/${id}`)}>
                    加为好友
                </Button>
            </>
        ),
        friend: (
            <>
                <Button type="default" onClick={() => navigate(`/shareHomePage/${id}`)}>
                    分享主页
                </Button>
                <Button type="primary">
                    <Link to={`/message/${id}`}>与Ta聊天</Link>
                </Button>
            </>
        ),
        self: (
            <Button type="primary" onClick={() => navigate(`/shareHomePage/${id}`)}>
                分享主页
            </Button>
        )
    }
    return relations[type]
}

export default memo(IntroWay)
