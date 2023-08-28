import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/message/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupsMsgApiRequestData, GroupsMessage } from './interface'

const url = apiName[1]

/** 获取某个群聊的历史聊天记录 */
export const getGroupsHistoryMsgHttpApi: HttpApi<GroupsMsgApiRequestData, Response<GroupsMessage[]>> = (params) =>
    instance({ url, method: 'get', params })
