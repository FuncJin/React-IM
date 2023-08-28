import type { ReactNode } from 'react'

import type { CustomObject } from '@interface/type'
import type { LikeIconState } from '@components/FriendsCircleListContent/interface'

export type Bar = CustomObject<LikeIconState, (f: IconsType['handleLiked']) => ReactNode>

/** 渲染点赞图标时的类型 */
export type IconsType = {
    /** 点赞图标的状态 */
    state: LikeIconState
    handleLiked: () => void
}
