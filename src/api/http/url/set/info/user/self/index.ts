import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/info/user/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { UserBasisInfo } from '@api/http/url/interface/user'

const url = apiName[2]
const api: HttpApi<UserBasisInfo> = (params) => instance({ url, method: 'get', params })

/** 修改个人信息 */
export const setUserInfoHttpApi = { url, api }
