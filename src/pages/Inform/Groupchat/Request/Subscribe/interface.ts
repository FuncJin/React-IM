import type { GroupchatSubscribeRequest } from '@api/http/url/get/request/groupchat/interface'

/** 更新群聊申请时的函数 */
type UpdateRequest = () => Promise<void>

/** 收到的群聊申请通知的类型Props */
export type SubType = {
    updateRequest: UpdateRequest
    subscribe: GroupchatSubscribeRequest[]
}
export type ReqType = {
    req: GroupchatSubscribeRequest
    updateRequest: UpdateRequest
}
export type RequestApi = (req: GroupchatSubscribeRequest, state: 0 | 1, updateRequest: UpdateRequest) => void
