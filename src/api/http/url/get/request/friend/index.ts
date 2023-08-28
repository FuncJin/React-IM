import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/request/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendRequestInform } from './interface'

const url = apiName[0]

/** 获取当前用户的好友申请通知 */
export const getFriendsRequestInformHttpApi: HttpApi<void, Response<FriendRequestInform>> = () =>
    instance({ url, method: 'get' })
