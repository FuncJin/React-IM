import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/info/user/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[0]
const api: HttpApi<string, Response<number>> = (id) => instance({ url, method: 'get', params: { id } })

/** 给某位用户点赞 */
export const addLikedHttpApi = { url, api }
