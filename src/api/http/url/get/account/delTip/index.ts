import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]

/** 获取当前用户的消息撤回文案 */
export const getDelTipHttpApi: HttpApi = () => instance({ url, method: 'get' })
