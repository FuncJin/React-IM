import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[2]

/** 获取当前用户是否加入了指定群聊 */
export const getIsJoinGroupchatHttpApi: HttpApi<string, Response<0 | 1>> = (id) =>
    instance({ url, method: 'get', params: { id } })
