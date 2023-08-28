import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { GroupchatBioApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<GroupchatBioApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 创建群聊 */
export const createGroupchatHttpApi = { url, api }
