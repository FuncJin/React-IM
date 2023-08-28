import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { IsJoinAllApiRequestData } from './interface'

const url = apiName[3]

/** 获取指定用户是否加入了指定群聊 */
export const getIsJoinAllGroupchatHttpApi: HttpApi<IsJoinAllApiRequestData, Response<0 | 1>> = (params) =>
    instance({ url, method: 'get', params })
