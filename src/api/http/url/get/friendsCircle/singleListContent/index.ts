import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'

const url = apiName[4]

/** 获取指定用户(某个账号自己所发布的所有说说)的朋友圈列表 */
export const getFriendsCircleSingleListContentHttpApi: HttpApi<string, Response<FriendsCircleContent[]>> = (id) =>
    instance({ url, method: 'get', params: { id } })
