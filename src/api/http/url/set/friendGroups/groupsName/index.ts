import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/friendGroups/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]
const api: HttpApi<Array<string[]>> = (steps) =>
    instance({ url, method: 'get', params: { steps: JSON.stringify(steps) } })

/** 修改当前用户的好友分组列表(名字) */
export const setFriendGroupsNameHttpApi = { url, api }
