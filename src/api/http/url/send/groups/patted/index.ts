import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/groups/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { GroupsPattedApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<GroupsPattedApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 发送群聊拍一拍 */
export const sendGroupsPattedHttpApi = { url, api }
