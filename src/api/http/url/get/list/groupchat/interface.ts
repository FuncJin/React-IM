import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'
import type { CustomValueByStringObject } from '@interface/type'

/** 用户群聊列表的格式 */
export type GroupchatList = CustomValueByStringObject<EveryAccountBasisInfo[]>
