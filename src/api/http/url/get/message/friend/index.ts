import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/message/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { PrivateMsgApiRequestData, PrivateMessage } from './interface'

const url = apiName[0]

/** 获取自己与对方之间的历史聊天记录(两个用户id) */
export const getPrivateHistoryMsgHttpApi: HttpApi<PrivateMsgApiRequestData, Response<PrivateMessage[]>> = (params) =>
    instance({ url, method: 'get', params })
