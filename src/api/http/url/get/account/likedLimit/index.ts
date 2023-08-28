import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[3]

/** 获取指定账号的点赞数量 */
export const getLikedLimitHttpApi: HttpApi<string, Response<number>> = (id) =>
    instance({ url, method: 'get', params: { id } })
