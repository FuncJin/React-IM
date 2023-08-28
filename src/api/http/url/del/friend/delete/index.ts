import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/del/friend/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]
const api: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })

/** 删除好友 */
export const delFriendHttpApi = { url, api }
