import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/list/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'

const url = apiName[3]

/** 获取当前平台的所有在线用户 */
export const getSoulmateEncountersHttpApi: HttpApi<void, Response<EveryAccountBasisInfo[]>> = () =>
    instance({ url, method: 'get' })
