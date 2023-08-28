import { LikeFilled, LikeOutlined, LoadingOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { IconsType, Bar } from './interface'

const bar: Bar = {
    liked: (handleLiked) => <LikeFilled className="im-p-fc-s-d-i-primary" onClick={handleLiked} />,
    dislike: (handleLiked) => <LikeOutlined onClick={handleLiked} />,
    loading: () => <LoadingOutlined />
}

/** 渲染点赞图标 */
const Icons: FC<IconsType> = ({ state, handleLiked }) => <span>{bar[state](handleLiked)}</span>

export default Icons
