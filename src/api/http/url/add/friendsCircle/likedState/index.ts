import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { LikedStateApiRequestData } from './interface'

const url = apiName[2]

/** 点赞或取消点赞某条朋友圈说说 */
export const switchFriendsCircleLikedStateHttpApi: HttpApi<LikedStateApiRequestData> = (params) =>
    instance({ url, method: 'get', params })
