import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/friendGroups/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { PositionApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<PositionApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 修改对方在当前用户的好友分组中的所在分组(位置) */
export const setPositionByFriendGroupsHttpApi = { url, api }
