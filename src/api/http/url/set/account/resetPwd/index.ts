import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { ResetPwdApiRequestData } from './interface'

const url = apiName[5]
const api: HttpApi<ResetPwdApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 重置某个账号的密码 */
export const resetPwdHttpApi = { url, api }
