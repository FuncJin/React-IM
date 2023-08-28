import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'
import type { CustomValueByStringObject } from '@interface/type'

/** 用户好友列表中每条好友的展示格式 */
type FriendSingleFormat = EveryAccountBasisInfo & {
    alias: string
    recently: string
    state: string
    isOnLine: boolean
}

/** 用户好友列表 */
export type FriendsList = CustomValueByStringObject<FriendSingleFormat[]>
