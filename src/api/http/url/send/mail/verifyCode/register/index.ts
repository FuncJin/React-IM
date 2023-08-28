import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/mail/verifyCode/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { RegisterCodeApiRequestData } from './interface'

const url = apiName[2]

/** 发送注册账号的邮箱验证码(需主动携带此账号要绑定的邮箱) */
export const verifyCodeByRegisterHttpApi: HttpApi<RegisterCodeApiRequestData> = (params) =>
    instance({ url, method: 'get', params })
