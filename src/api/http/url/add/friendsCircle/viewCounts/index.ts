import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { ViewCountsApiRequestData } from './interface'

const url = apiName[3]

/** 增加指定用户的朋友圈说说浏览次数 */
export const addFriendsCircleViewCountsHttpApi: HttpApi<ViewCountsApiRequestData> = (params) =>
    instance({ url, method: 'get', params })
