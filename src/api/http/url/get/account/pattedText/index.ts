import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[4]

/** 获取指定账号的拍一拍文案 */
export const getPattedTextHttpApi: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })
