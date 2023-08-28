import { formDataHttpApi } from '@api/http/url/utils/formdata'
import { apiName } from '@api/http/url/voice/friendsCircle/apiName'

import type { HttpApi } from '@api/http/interface/api'
import type { VoiceContentApiRequestData } from './interface'

const url = apiName[0]

/** 发布朋友圈说说(携带语音) */
export const createFriendsCircleVoiceContentHttpApi: HttpApi<VoiceContentApiRequestData> = ({ file, body }) =>
    formDataHttpApi(url, file, body)
