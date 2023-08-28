import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/private/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { PrivateTextMsgApiRequestData } from './interface'

const url = apiName[0]

/** 发送私聊消息(文字形式) */
export const sendPrivateTextMsgHttpApi: HttpApi<PrivateTextMsgApiRequestData> = (params) =>
    instance({ url, method: 'get', params })
