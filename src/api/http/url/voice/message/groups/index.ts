import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/voice/message/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { VoiceMsgApiRequestData } from './interface'

const url = apiName[0]

/** 发送群聊消息(语音形式) */
export const sendGroupsVoiceMsgHttpApi: HttpApi<VoiceMsgApiRequestData> = ({ id, file }) =>
    formDataHttpApi(url(id), file)
