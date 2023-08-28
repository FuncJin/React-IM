import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friend/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[0]

/** 获取指定用户在当前用户的好友分组列表下的当前所在分组名称 */
export const getCurGroupsNameHttpApi: HttpApi<string, Response<string>> = (id) =>
    instance({ url, method: 'get', params: { id } })
