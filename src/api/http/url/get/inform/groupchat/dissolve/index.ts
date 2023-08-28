import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { DissolveGroupchatInform } from './interface'

const url = apiName[1]

/** 获取跟当前用户相关的解散群聊通知 */
export const getDissolveInformByGroupchatHttpApi: HttpApi<void, Response<DissolveGroupchatInform[]>> = () =>
    instance({ url, method: 'get' })
