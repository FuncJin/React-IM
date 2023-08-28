import type { FriendsCircleInformType } from '@api/http/url/interface/friendsCircle'

/** 朋友圈中收到与发出通知的类型 */
export type FriendsCircleInformFormat = {
    id: string
    avatar: string
    nickname: string
    time: number
    content: string
    type: FriendsCircleInformType
    body: string
}

/** 朋友圈中收到与发出的通知 */
export type FriendsCircleInform = {
    subscribe: FriendsCircleInformFormat[]
    publish: FriendsCircleInformFormat[]
}
