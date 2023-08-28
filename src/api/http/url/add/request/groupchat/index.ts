import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/request/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { GroupchatRequestApiData } from './interface'

const url = apiName[1]
const api: HttpApi<GroupchatRequestApiData> = (params) => instance({ url, method: 'get', params })

/** 发送群聊申请 */
export const createGroupchatRequestHttpApi = { url, api }
