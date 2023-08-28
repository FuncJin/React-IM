import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupchatRole } from '@api/http/url/interface/groupchat'

const url = apiName[6]

/** 获取当前用户在指定群聊中的角色(已入群) */
export const getGroupchatRoleHttpApi: HttpApi<string, Response<GroupchatRole>> = (id) =>
    instance({ url, method: 'get', params: { id } })
