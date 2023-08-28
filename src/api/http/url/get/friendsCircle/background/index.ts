import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 获取指定用户的朋友圈主页背景图 */
export const getFriendsCircleBackgroundHttpApi: HttpApi<string> = (id) =>
    instance({ url, method: 'get', params: { id } })
