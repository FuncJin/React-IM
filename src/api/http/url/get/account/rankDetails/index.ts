import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { RankDetails } from './interface'

const url = apiName[7]

/** 获取当前用户的账号等级详情 */
export const getRankDetailsHttpApi: HttpApi<void, Response<RankDetails>> = () => instance({ url, method: 'get' })
