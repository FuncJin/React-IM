import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 修改当前用户的消息撤回文案 */
export const setDelTipHttpApi: HttpApi<number> = (num) => instance({ url, method: 'get', params: { num } })
