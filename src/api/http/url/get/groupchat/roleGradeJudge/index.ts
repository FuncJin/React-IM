import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { RoleGradeApiRequestData } from './interface'

const url = apiName[5]

/** 判断群聊成员角色权限大小 */
export const getGradeJudgeByGroupchatRoleHttpApi: HttpApi<RoleGradeApiRequestData, Response<boolean>> = (params) =>
    instance({ url, method: 'get', params })
