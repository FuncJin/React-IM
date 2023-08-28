import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/request/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupchatRequestInform } from './interface'

const url = apiName[1]

/** 获取当前用户的群聊申请通知 */
export const getGroupchatRequestInformHttpApi: HttpApi<void, Response<GroupchatRequestInform>> = () =>
    instance({ url, method: 'get' })
