import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { ChangeAdminGroupchatInform } from './interface'

const url = apiName[0]

/** 获取跟当前用户相关的群聊管理员变更通知 */
export const getChangeAdminInformByGroupchatHttpApi: HttpApi<void, Response<ChangeAdminGroupchatInform[]>> = () =>
    instance({ url, method: 'get' })
