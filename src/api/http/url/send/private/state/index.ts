import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/private/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[2]

/** 更改某位好友在私聊聊天界面中的未读消息状态 */
export const sendPrivateUnreadMsgStateHttpApi: HttpApi<string> = (id) =>
    instance({ url, method: 'get', params: { id } })
