import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/user/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { UserLikedSingleFormat } from './interface'

const url = apiName[0]

/** 获取当前用户收到的点赞通知 */
export const getUserLikedInformHttpApi: HttpApi<void, Response<UserLikedSingleFormat[]>> = () =>
    instance({ url, method: 'get' })
