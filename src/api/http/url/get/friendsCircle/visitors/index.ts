import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendCircleVisitor } from './interface'

const url = apiName[6]

/** 获取指定用户的朋友圈访客 */
export const getFriendsCircleVisitorsHttpApi: HttpApi<string, Response<FriendCircleVisitor[] | null>> = (id) =>
    instance({ url, method: 'get', params: { id } })
