import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[3]

/** 获取指定用户的朋友圈可见时间范围 */
export const getFriendsCircleSectionTimeHttpApi: HttpApi<string, Response<number>> = (id) =>
    instance({ url, method: 'get', params: { id } })
