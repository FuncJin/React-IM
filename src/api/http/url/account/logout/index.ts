import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/account/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { LogoutApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<LogoutApiRequestData> = (data) => instance({ url, method: 'post', data })

/** 注销账号 */
export const logoutHttpApi = { url, api }
