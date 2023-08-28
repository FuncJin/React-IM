import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[4]
const api: HttpApi<string> = (text) => instance({ url, method: 'get', params: { text } })

/** 修改当前用户的拍一拍文案 */
export const setPattedTextHttpApi = { url, api }
