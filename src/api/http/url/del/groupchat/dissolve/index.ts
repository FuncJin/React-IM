import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/del/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]
const api: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })

/** 解散群聊 */
export const dissolveGroupchatHttpApi = { url, api }
