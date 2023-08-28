import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupchatRole } from '@api/http/url/interface/groupchat'
import type { RoleApiRequestData } from './interface'

const url = apiName[0]

/** 获取指定用户在指定群聊中的角色(未入群) */
export const getGroupchatAssignRoleByUserHttpApi: HttpApi<RoleApiRequestData, Response<GroupchatRole>> = (params) =>
    instance({ url, method: 'get', params })
