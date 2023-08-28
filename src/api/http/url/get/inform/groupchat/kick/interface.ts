import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'

/** 踢出群聊通知的格式 */
export type KickGroupchatInform = {
    handler: EveryAccountBasisInfo
    beKick: EveryAccountBasisInfo
    groupchat: EveryAccountBasisInfo
    time: number
}
