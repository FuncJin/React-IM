import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/mail/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 获取当前用户所绑定的邮箱 */
export const getUserBindMailHttpApi: HttpApi = () => instance({ url, method: 'get' })
