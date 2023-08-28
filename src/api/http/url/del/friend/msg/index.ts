import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/del/friend/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { DelPrivateMsgApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<DelPrivateMsgApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 撤回私聊消息 */
export const delPrivateMsgHttpApi = { url, api }
