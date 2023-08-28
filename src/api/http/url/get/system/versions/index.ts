import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/system/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { VersionsType } from './interface'

const url = apiName[2]

/** 获取平台的版本历史记录 */
export const getVersionsHttpApi: HttpApi<void, Response<VersionsType[]>> = () => instance({ url, method: 'get' })
