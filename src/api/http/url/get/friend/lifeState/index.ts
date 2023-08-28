import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friend/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[3]

/** 获取指定用户的生活状态 */
export const getLifeStateHttpApi: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })
