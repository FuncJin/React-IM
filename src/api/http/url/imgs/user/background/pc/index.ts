import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/user/background/apiName'

import type { RcFile } from 'antd/es/upload/interface'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[2]

/** 上传pc端主页背景图 */
export const uploadPcBackgroundHttpApi: HttpApi<RcFile> = (file) => formDataHttpApi(url, file)
