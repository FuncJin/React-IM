import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { message as antdMessage } from 'antd'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'

import Row from './Row'

import { getFriendsCircleVisitorsHttpApi } from '@api/http/url/get/friendsCircle/visitors'

import type { FriendCircleVisitor } from '@api/http/url/get/friendsCircle/visitors/interface'

/** 朋友圈访客记录 */
const Visitors = () => {
    // 访客记录列表
    const [visitors, setVisitors] = useState<FriendCircleVisitor[] | null>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    const { pathname, state: locationState } = useLocation()
    const oid = locationState?.oid ? locationState?.oid : pathname.split('/')[2]
    useEffect(() => {
        getFriendsCircleVisitorsHttpApi(oid)({
            succeed: { func: (p) => setVisitors(p) },
            failed: { func: () => antdMessage.error('无权限') },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="来访记录" isLoading={loading}>
            {loading ? null : visitors ? (
                <Row visitors={visitors} />
            ) : (
                <CommonRow comment="你无权查看对方的朋友圈访客记录" />
            )}
        </Sideslip>
    )
}

export default Visitors
