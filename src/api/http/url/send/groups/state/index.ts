import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/groups/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { UnreadMsgStateApiRequestData } from './interface'

const url = apiName[2]

/** 更改某位用户在群聊聊天界面中的未读消息状态 */
export const changeGroupsUnreadMsgStateHttpApi: HttpApi<UnreadMsgStateApiRequestData> = (params) =>
    instance({ url, method: 'get', params })
