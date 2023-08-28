import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/send/mail/verifyCode/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 向当前用户所绑定的邮箱发送修改密码的邮箱验证码 */
export const verifyCodeByChangePwdHttpApi: HttpApi = () => instance({ url, method: 'get' })
