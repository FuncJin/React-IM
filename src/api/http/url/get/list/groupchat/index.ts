import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/list/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { GroupchatList } from './interface'

const url = apiName[1]

/** 获取当前用户的群聊列表 */
export const getGroupchatListHttpApi: HttpApi<void, Response<GroupchatList>> = () => instance({ url, method: 'get' })
