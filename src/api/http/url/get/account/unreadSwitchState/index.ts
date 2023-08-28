import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[8]

/** 获取当前用户的账号未读消息提醒开关状态 */
export const getUnreadSwitchStateHttpApi: HttpApi<void, Response<0 | 1>> = () => instance({ url, method: 'get' })
