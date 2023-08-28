import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/user/avatar/apiName'

import type { RcFile } from 'antd/es/upload/interface'

import type { HttpApi } from '@api/http/interface/api'

const url = apiName[0]

/** 上传用户头像 */
export const uploadUserAvatarHttpApi: HttpApi<RcFile> = (file) => formDataHttpApi(url, file)
