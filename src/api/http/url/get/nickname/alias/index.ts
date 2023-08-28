import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/nickname/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 获取好友备注 */
export const getAliasHttpApi: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })
