import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[5]

/** 获取指定用户的朋友圈访客总数 */
export const getFriendsCircleVisitorLimitHttpApi: HttpApi<string, Response<number | null>> = (id) =>
    instance({ url, method: 'get', params: { id } })
