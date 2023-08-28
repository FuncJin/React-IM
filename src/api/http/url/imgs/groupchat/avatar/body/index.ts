import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/groupchat/avatar/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { FormDataGroupchatBodyApiRequestData } from '@api/http/url/imgs/groupchat/interface'

const url = apiName[0]

/** 上传群聊头像 */
export const uploadGroupchatAvatarHttpApi: HttpApi<FormDataGroupchatBodyApiRequestData> = ({ file, id }) =>
    formDataHttpApi(url(id), file)
