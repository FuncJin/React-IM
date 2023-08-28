import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/unread/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { HomeUnreadInform } from './interface'

const url = apiName[0]

/** 获取当前用户的首页未读通知 */
export const getHomeUnreadInformHttpApi: HttpApi<void, Response<HomeUnreadInform>> = () =>
    instance({ url, method: 'get' })
