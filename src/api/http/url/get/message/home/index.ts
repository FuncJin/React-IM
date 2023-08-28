import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/message/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { HomeMessageList } from './interface'

const url = apiName[2]

/** 获取当前用户的首页消息列表 */
export const getHomeMessageListHttpApi: HttpApi<void, Response<HomeMessageList>> = () =>
    instance({ url, method: 'get' })
