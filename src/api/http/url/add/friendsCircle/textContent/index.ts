import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]
const api: HttpApi<string> = (content) => instance({ url, method: 'get', params: { content } })

/** 发布朋友圈说说(纯文字形式，不携带图片) */
export const createFriendsCircleTextContentHttpApi = { url, api }
