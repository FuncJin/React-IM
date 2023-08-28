import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'

/** 渲染评论或回复时的类型 */
export type CommentType = {
    comment: FriendsCircleContent['comment']
    handleReply: (oid: string, nickname: string) => void
}
