import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/message/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { PrivateImgMsgApiRequestData } from './interface'

const url = apiName[1]

/** 发送私聊消息(图片形式) */
export const sendPrivateImgMsgHttpApi: HttpApi<PrivateImgMsgApiRequestData> = ({ uid, oid, file }) =>
    formDataHttpApi(url(uid, oid), file)
