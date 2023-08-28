import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/unread/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[1]

/** 获取当前用户的未读通知总数 */
export const getUnreadInformTotalsHttpApi: HttpApi<void, Response<number>> = () => instance({ url, method: 'get' })
