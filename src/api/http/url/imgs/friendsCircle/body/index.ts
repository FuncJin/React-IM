import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { FriendsCircleImgContentApiRequestData } from './interface'

const url = apiName[0]

/** 发布朋友圈说说(携带图片) */
export const createFriendsCircleImgContentHttpApi: HttpApi<FriendsCircleImgContentApiRequestData> = ({ file, body }) =>
    formDataHttpApi(url, file, body)
