import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/user/background/apiName'

import type { RcFile } from 'antd/es/upload/interface'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 上传朋友圈主页背景图 */
export const uploadFriendsCircleBackgroundHttpApi: HttpApi<RcFile> = (file) => formDataHttpApi(url, file)
