import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { BanTimeApiRequestData } from './interface'

const url = apiName[1]

/** 获取当前用户在指定群聊中的禁言时间 */
export const getGroupchatBanTimeHttpApi: HttpApi<BanTimeApiRequestData, Response<number>> = (params) =>
    instance({ url, method: 'get', params })
