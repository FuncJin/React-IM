import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { KickGroupchatInform } from './interface'

const url = apiName[2]

/** 获取当前用户所创建与管理群聊的踢出群聊通知，及当前用户被踢出的群聊通知 */
export const getKickInformByGroupchatHttpApi: HttpApi<void, Response<KickGroupchatInform[]>> = () =>
    instance({ url, method: 'get' })
