import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/info/groupchat/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { InfoApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<InfoApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 修改指定群聊的信息 */
export const setGroupchatInfoHttpApi = { url, api }
