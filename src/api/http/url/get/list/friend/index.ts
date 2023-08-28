import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/list/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendsList } from './interface'

const url = apiName[0]

/** 获取当前用户的好友列表 */
export const getFriendsListHttpApi: HttpApi<void, Response<FriendsList>> = () => instance({ url, method: 'get' })
