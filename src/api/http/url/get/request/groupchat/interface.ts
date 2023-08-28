import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'
import type { RequestState } from '@api/http/url/interface/request'

/** 收到的群聊申请 */
export type GroupchatSubscribeRequest = {
    requester: EveryAccountBasisInfo
    handler: EveryAccountBasisInfo
    groupchat: EveryAccountBasisInfo
    time: number
    state: RequestState
    msg: string
}
/** 发出的群聊申请 */
export type GroupchatPublishRequest = {
    handler: EveryAccountBasisInfo
    groupchat: EveryAccountBasisInfo
    time: number
    state: RequestState
    msg: string
}

/** 群聊申请通知的格式 */
export type GroupchatRequestInform = {
    subscribe: GroupchatSubscribeRequest[]
    publish: GroupchatPublishRequest[]
}
