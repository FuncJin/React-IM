import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/groups/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { GroupsTextMsgApiRequestData } from './interface'

const url = apiName[0]

/** 发送群聊消息(文字形式) */
export const sendGroupsTextMsgHttpApi: HttpApi<GroupsTextMsgApiRequestData> = (params) =>
    instance({ url, method: 'get', params })
