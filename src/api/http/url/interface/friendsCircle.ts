import type { ImgMessage, VoiceMessage } from '@api/http/url/get/message/interface'
import type { EveryAccountBasisInfo } from './account'

/** 每条回复的格式 */
type FriendsCircleReply = {
    type: 'reply'
    user: EveryAccountBasisInfo
    below: EveryAccountBasisInfo
    time: number
    content: string
}
/** 每条评论的格式 */
type FriendsCircleComment = {
    type: 'comment'
    id: string
    nickname: string
    content: string
    time: number
}
/** 点赞者 */
type LikedPerson = {
    id: string
    nickname: string
    time: number
}

/** 朋友圈通知类型 */
export type FriendsCircleInformType = 'comment' | 'reply' | 'liked'
/** 朋友圈角色权限 */
export type FriendsCircleRoleType = 'self' | 'public' | 'private' | 'friend' | 'stranger'
/** 朋友圈配置权限 */
export type FriendsCircleRoleConfigType = 'public' | 'private' | 'friend'

/** 单条说说的格式 */
export type FriendsCircleContent = EveryAccountBasisInfo & {
    content: string
    img?: ImgMessage
    voice?: VoiceMessage
    time: number
    viewCounts: { id: string; time: number }[]
    isLiked: boolean
    key?: null
    /**
     * 由于key不属于React中的自定义属性，所以此处使用fcKey代替服务端返回的key
     * (K大写)
     */
    fcKey: string
    like: {
        counts: number
        persons: LikedPerson[]
    }
    comment: (FriendsCircleComment | FriendsCircleReply)[]
}
