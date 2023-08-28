import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[2][1]

/** 修改当前用户的朋友圈可见时间范围 */
export const setFriendsCircleSectionTimeHttpApi: HttpApi<number> = (num) =>
    instance({ url, method: 'get', params: { num } })
