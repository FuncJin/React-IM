import { useState, useEffect, useMemo, memo } from 'react'

import { LikeOutlined } from '@ant-design/icons'

import TourAxios from '@components/TourAxios'
import { message } from '@components/Message'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'

import { getLikedLimitHttpApi } from '@api/http/url/get/account/likedLimit'
import { addLikedHttpApi } from '@api/http/url/set/info/user/liked'

import type { FC } from 'react'

import type { LikedLimitType } from './interface'

const uid = storage.get('react_im_user_id')

/** 用户主页点赞数量 */
const LikedLimit: FC<LikedLimitType> = ({ id }) => {
    // 对方点赞数
    const [liked, setLiked] = useState(0)
    /** 点赞前的检查 */
    const likedBefore = useEventCallback(() => (uid === id ? message({ title: '还不能给自己点赞哦' }) : true))
    const likedLoading = useMemo(() => ({ isOnlyIcon: true }), [])
    /** 给对方点赞 */
    const toLiked = useEventCallback(() =>
        addLikedHttpApi.api(id)({
            succeed: { func: (limit) => setLiked(limit) },
            failed: { func: (title) => message({ title }) }
        })
    )
    useEffect(() => {
        // 获取点赞数量
        getLikedLimitHttpApi(id)({
            succeed: { func: (limit) => setLiked(limit) },
            failed: { func: () => message({ title: '点赞获取失败' }) }
        })
    }, [])
    return (
        <>
            <TourAxios
                name={addLikedHttpApi.url}
                disabled="点赞"
                before={likedBefore}
                api={toLiked}
                loading={likedLoading}>
                <LikeOutlined style={{ cursor: 'pointer' }} />
            </TourAxios>
            <p>{liked}</p>
        </>
    )
}

export default memo(LikedLimit)
