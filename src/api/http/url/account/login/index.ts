import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/account/apiName'

import type { AccountReturnInfo } from '@api/http/url/interface/account'
import type { HttpApi, Response } from '@api/http/interface/api'
import type { LoginApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<LoginApiRequestData, Response<AccountReturnInfo>> = (data) => instance({ url, method: 'post', data })

/** 账号登录 */
export const loginHttpApi = { url, api }
