import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/system/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { ApiStateDetails } from './interface'

const url = apiName[0]

/** 获取平台接口状态详情 */
export const getApiStateDetailsHttpApi: HttpApi<void, Response<ApiStateDetails>> = () =>
    instance({ url, method: 'get' })
