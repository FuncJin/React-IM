import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'

/** 管理员变更通知 */
export type ChangeAdminGroupchatInform = {
    host: EveryAccountBasisInfo
    user: EveryAccountBasisInfo
    groupchat: EveryAccountBasisInfo
    state: 0 | 1
    time: number
}
