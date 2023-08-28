import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { AdminApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<AdminApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 将群聊中的某位普通成员设为管理员 */
export const addGroupchatAdminHttpApi = { url, api }
