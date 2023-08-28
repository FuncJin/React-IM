import type { RequestState } from '@api/http/url/interface/request'

/** 对方(申请者)的信息 */
type UserRequest = {
    id: string
    nickname: string
    time: number
    state: RequestState
    msg: string
}

/** 收到的好友申请 */
export type UserSubscribeRequest = UserRequest
/** 发出的好友申请 */
export type UserPublishRequest = UserRequest

/** 好友申请通知 */
export type FriendRequestInform = {
    subscribe: UserSubscribeRequest[]
    publish: UserPublishRequest[]
}
