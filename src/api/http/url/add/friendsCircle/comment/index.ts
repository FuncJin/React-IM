import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/add/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { CommentApiRequestData } from './interface'

const url = apiName[0]
const api: HttpApi<CommentApiRequestData> = (params) => instance({ url, method: 'get', params })

/** 评论或回复某条朋友圈说说 */
export const createFriendsCircleCommentHttpApi = { url, api }
