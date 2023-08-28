import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/private/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]
const api: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })

/** 发送私聊拍一拍 */
export const sendPrivatePattedHttpApi = { url, api }
