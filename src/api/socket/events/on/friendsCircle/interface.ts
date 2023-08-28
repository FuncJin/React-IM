import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'

/** 朋友圈Socket On Api */
export type FriendsCircleSocketByOnApi = {
    /** 首页朋友圈列表 */
    friendsCircleList: (data: FriendsCircleContent[]) => void
}
