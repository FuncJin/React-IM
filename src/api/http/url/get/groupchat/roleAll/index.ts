import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupchatRole } from '@api/http/url/interface/groupchat'

const url = apiName[7]

/** 获取当前用户在指定群聊中的角色(未入群) */
export const getGroupchatRoleAllHttpApi: HttpApi<string, Response<GroupchatRole | 'no'>> = (id) =>
    instance({ url, method: 'get', params: { id } })
