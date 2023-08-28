import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/inform/groupchat/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { QuitGroupchatInform } from './interface'

const url = apiName[3]

/* 获取跟当前用户相关的退群通知 */
export const getQuitInformByGroupchatHttpApi: HttpApi<void, Response<QuitGroupchatInform[]>> = () =>
    instance({ url, method: 'get' })
