import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/del/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { CancelAdminApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<CancelAdminApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 取消某位成员的群管理员身份 */
export const delGroupchatAdminHttpApi = { url, api }
