import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/request/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { FriendRequestApiData } from './interface'

const url = apiName[0]
const api: HttpApi<FriendRequestApiData> = (params) => instance({ url, method: 'get', params })

/** 发送好友申请 */
export const createFriendRequestHttpApi = { url, api }
