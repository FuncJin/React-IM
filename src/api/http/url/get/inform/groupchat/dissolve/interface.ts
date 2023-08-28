import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'

/** 解散群聊通知的格式 */
export type DissolveGroupchatInform = {
    user: EveryAccountBasisInfo
    groupchat: EveryAccountBasisInfo
    time: number
}
