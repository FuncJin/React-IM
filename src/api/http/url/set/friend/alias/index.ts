import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/friend/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { FriendAliasApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<FriendAliasApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 修改好友备注 */
export const setFriendAliasHttpApi = { url, api }
