import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/del/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { KickMemberApiRequestData } from './interface'

const url = apiName[2]
const api: HttpApi<KickMemberApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 踢出群聊中的某位成员 */
export const kickGroupchatMemberHttpApi = { url, api }
