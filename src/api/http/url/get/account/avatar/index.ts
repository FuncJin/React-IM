import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 获取指定账号的头像url地址 */
export const getAvatarHttpApi: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })
