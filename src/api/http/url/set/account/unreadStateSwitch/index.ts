import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[6]

/** 修改当前用户的账号未读消息提醒开关 */
export const switchUnreadStateHttpApi: HttpApi<0 | 1> = (state) => instance({ url, method: 'get', params: { state } })
