import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'

export type FriendsCircleListType = {
    /** 初始展示的列表 */
    list: FriendsCircleContent[]
    /** 发生了点赞、评论等动作时触发的回调函数 */
    actionCb?: () => void
}

export type CommentTextType = {
    /** 标识是评论操作还是回复操作 */
    type: 'comment' | 'reply'
    /** 被回复者的id */
    oid: string
    /** 提示文字(评论xxx、回复xxx) */
    nickname: string
    /** 是否正在回复或评论中 */
    isLoading: boolean
}

/**
 * 点赞的状态
 * - liked已点赞
 * - dislike未点赞
 * - loading点赞中或取消点赞中
 */
export type LikeIconState = 'liked' | 'dislike' | 'loading'
