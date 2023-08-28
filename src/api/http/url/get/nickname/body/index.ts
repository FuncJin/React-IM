import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/nickname/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]

/** 获取某个id的昵称(id可能为好友、群聊) */
export const getNicknameHttpApi: HttpApi<string> = (id) => instance({ url, method: 'get', params: { id } })
