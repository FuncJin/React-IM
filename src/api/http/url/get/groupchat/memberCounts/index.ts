import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { MemberCountsApiRequestData } from './interface'

const url = apiName[4]

/** 获取指定群聊的成员人数总和 */
export const getGroupchatMemberCountsHttpApi: HttpApi<MemberCountsApiRequestData, Response<number>> = (params) =>
    instance({ url, method: 'get', params })
