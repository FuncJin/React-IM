import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/request/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { FriendRequestApiData } from './interface'

const url = apiName[0]
const api: HttpApi<FriendRequestApiData> = (params) => instance({ url, method: 'get', params })

/** 同意或拒绝好友申请 */
export const handleFriendRequestHttpApi = { url, api }
