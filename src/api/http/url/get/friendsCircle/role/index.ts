import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendsCircleRoleConfigType } from '@api/http/url/interface/friendsCircle'

const url = apiName[2]

/** 获取指定用户的朋友圈权限 */
export const getFriendsCircleRoleHttpApi: HttpApi<string, Response<FriendsCircleRoleConfigType>> = (id) =>
    instance({ url, method: 'get', params: { id } })
