import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/request/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { GroupchatRequestApiData } from './interface'

const url = apiName[1]
const api: HttpApi<GroupchatRequestApiData> = (params) => instance({ url, method: 'get', params })

/** 同意或拒绝群聊申请 */
export const handleGroupchatRequestHttpApi = { url, api }
