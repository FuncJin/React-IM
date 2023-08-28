import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/quit/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]
const api: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })

/** 退出群聊 */
export const quitGroupchatHttpApi = { url, api }
