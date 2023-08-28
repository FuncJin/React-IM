import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[3]

/** 修改当前用户的生活状态 */
export const setLifeStateHttpApi: HttpApi<number> = (num) => instance({ url, method: 'get', params: { num } })
