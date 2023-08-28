import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/quit/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]
const api: HttpApi = () => instance({ url, method: 'get' })

/** 退出登录 */
export const quitLoginHttpApi = { url, api }
