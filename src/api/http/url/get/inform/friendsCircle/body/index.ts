import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/friendsCircle/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendsCircleInform } from './interface'

const url = apiName[0]

/** 获取用户朋友圈收到及发出的申请 */
export const getFriendsCircleRequestHttpApi: HttpApi<void, Response<FriendsCircleInform>> = () =>
    instance({ url, method: 'get' })
