import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/groupchat/background/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { FormDataGroupchatBodyApiRequestData } from '@api/http/url/imgs/groupchat/interface'

const url = apiName[0]

/** 上传群聊主页背景图片 */
export const uploadGroupchatBackgroundHttpApi: HttpApi<FormDataGroupchatBodyApiRequestData> = ({ file, id }) =>
    formDataHttpApi(url(id), file)
