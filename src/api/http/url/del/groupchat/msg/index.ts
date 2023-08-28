import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/del/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { DelGroupsMsgApiRequestData } from './interface'

const url = apiName[3]
const api: HttpApi<DelGroupsMsgApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 撤回群聊消息 */
export const delGroupsMsgHttpApi = { url, api }
