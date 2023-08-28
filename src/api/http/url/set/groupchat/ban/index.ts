import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { BanApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<BanApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 禁言群聊中的某位用户 */
export const banMemberByGroupchatHttpApi = { url, api }
