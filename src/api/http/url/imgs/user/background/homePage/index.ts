import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/user/background/apiName'

import type { RcFile } from 'antd/es/upload/interface'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[1]

/** 上传用户主页背景图片 */
export const uploadHomePageBackgroundHttpApi: HttpApi<RcFile> = (file) => formDataHttpApi(url, file)
