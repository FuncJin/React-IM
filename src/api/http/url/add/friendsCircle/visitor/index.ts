import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[4]

/** 增加指定用户的朋友圈访客 */
export const addFriendsCicleVisitorHttpApi: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })
