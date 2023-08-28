import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[5]

/** 获取当前用户在pc端的自定义主页背景图片 */
export const getPcBackgroundHttpApi: HttpApi = () => instance({ url, method: 'get' })
