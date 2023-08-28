import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/info/user/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { ChangePwdApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<ChangePwdApiRequestData> = (data) => instance({ url, method: 'post', data })

/** 修改密码 */
export const changePwdHttpApi = { url, api }
