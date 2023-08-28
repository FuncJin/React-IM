import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/list/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupchatPersonInfo, GroupchatMemberRoleApiRequestData } from './interface'

const url = apiName[2]

/**
 * 获取指定群聊的群聊成员
 *
 * 分为all(全部)、admins(管理员)、commons(普通成员)三种请求类型
 */
export const getGroupchatMemberByRole: HttpApi<GroupchatMemberRoleApiRequestData, Response<GroupchatPersonInfo>> = ({
    id,
    type
}) => instance({ url: url(type), method: 'get', params: { id } })
