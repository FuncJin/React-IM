import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/voice/message/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { VoiceMsgApiRequestData } from './interface'

const url = apiName[1]

/** 发送私聊消息(语音形式) */
export const sendPrivateVoiceMsgHttpApi: HttpApi<VoiceMsgApiRequestData> = ({ uid, oid, file }) =>
    formDataHttpApi(url(uid, oid), file)
