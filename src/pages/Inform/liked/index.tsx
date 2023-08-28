import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import { timeUtils } from '@utils/time'

import { getUserLikedInformHttpApi } from '@api/http/url/get/inform/user/liked'

import type { UserLikedSingleFormat } from '@api/http/url/get/inform/user/liked/interface'

/** 主页点赞通知 */
const Liked = () => {
    // 点赞通知列表
    const [likedList, setLikedList] = useState<UserLikedSingleFormat[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getUserLikedInformHttpApi()({
            succeed: { func: (likedList) => setLikedList(likedList) },
            failed: { func: () => message({ title: '点赞通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="主页点赞通知" isLoading={loading}>
            <ul>
                {likedList.map((inform, idx) => (
                    <li className="im-panel-informs-list" key={idx}>
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.id}`}>
                            {inform.nickname}
                        </Link>
                        在<time>{timeUtils.getTime(inform.time).all}</time>时给你点赞了
                    </li>
                ))}
            </ul>
            {loading ? null : likedList.length ? null : <Empty feedback="点赞通知空空如也，快去结交更多好友吧~" />}
        </Sideslip>
    )
}

export default Liked
