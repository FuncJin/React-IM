import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'

const url = apiName[1]

/** 获取指定用户好友列表中的所有好友（包括自己）的朋友圈说说 */
export const getFriendsCircleListContentHttpApi: HttpApi<void, Response<FriendsCircleContent[]>> = () =>
    instance({ url, method: 'get' })
