import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/friend/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'

const url = apiName[4]

/** 获取两个用户之间的关系是否为好友关系(不能是自己，但可以曾经是好友) */
export const getPreRelationsHttpApi: HttpApi<string, Response<0 | 1>> = (id) =>
    instance({ url, method: 'get', params: { id } })
