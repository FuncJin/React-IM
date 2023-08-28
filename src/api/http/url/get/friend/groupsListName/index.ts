import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friend/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[1]

/** 获取当前用户的好友分组列表名称 */
export const getGroupsListNameHttpApi: HttpApi<void, Response<string[]>> = () => instance({ url, method: 'get' })
