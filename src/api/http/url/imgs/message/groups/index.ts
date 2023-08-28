import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/imgs/message/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { GroupsImgMsgApiRequestData } from './interface'

const url = apiName[0]

/** 发送群聊消息(图片形式) */
export const sendGroupsImgMsgHttpApi: HttpApi<GroupsImgMsgApiRequestData> = ({ id, file }) =>
    formDataHttpApi(url(id), file)
