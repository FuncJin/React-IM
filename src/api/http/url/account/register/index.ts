import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/account/apiName'

import type { AccountReturnInfo } from '@api/http/url/interface/account'
import type { HttpApi, Response } from '@api/http/interface/api'
import type { RegisterApiRequestData } from './interface'

const url = apiName[2]
const api: HttpApi<RegisterApiRequestData, Response<AccountReturnInfo>> = (data) =>
    instance({ url, method: 'post', data })

/** 注册账号 */
export const registerHttpApi = { url, api }
