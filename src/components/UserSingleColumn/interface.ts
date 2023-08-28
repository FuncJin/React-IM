import type { ReactNode } from 'react'

/** 用于首页的消息、好友、群聊列表的展示 */
export type UserSingleColumnType = {
    /** 要跳转的路径 */
    path: string
    /** 头像的url地址 */
    avatar: string
    /** 昵称 */
    nickname: ReactNode
    /** 是否展示时间 */
    time?: string
    /** 是否展示文字 */
    text?: ReactNode
    /** 是否展示徽标 */
    badge?: number
    /** 是否降低nickname的显示颜色 */
    isIncNicknameColor?: boolean
}
