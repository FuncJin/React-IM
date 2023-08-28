import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/system/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { SystemInform } from './interface'

const url = apiName[0]

/** 获取平台公告 */
export const getSystemInformHttpApi: HttpApi<void, Response<SystemInform[]>> = () => instance({ url, method: 'get' })
