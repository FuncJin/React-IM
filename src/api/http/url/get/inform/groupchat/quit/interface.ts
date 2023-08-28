import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'

/** 退出群聊通知的格式 */
export type QuitGroupchatInform = {
    user: EveryAccountBasisInfo
    groupchat: EveryAccountBasisInfo
    time: number
}
