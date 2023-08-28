import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/message/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[3]

/** 获取当前用户的所有未读消息数量(仅聊天消息) */
export const getUnreadMsgTotalsHttpApi: HttpApi<void, Response<number>> = () => instance({ url, method: 'get' })
