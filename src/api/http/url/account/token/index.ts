import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[3]

/** 判断当前账号的token是否有效(无效时，会进入axios自行处理) */
export const isVaildTokenHttpApi: HttpApi = () => instance({ url, method: 'get' })
