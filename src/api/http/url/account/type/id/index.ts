import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/account/apiName'

import type { AccountType } from '@api/http/url/interface/account'
import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[4]

/** 获取id类型(分为uid、gid、noid三种) */
export const getIdTypeHttpApi: HttpApi<string, Response<AccountType>> = (id) =>
    instance({ url, method: 'get', params: { id } })
