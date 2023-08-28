import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[6]

/** 获取当前用户的账号等级 */
export const getRankHttpApi: HttpApi<void, Response<number>> = () => instance({ url, method: 'get' })
