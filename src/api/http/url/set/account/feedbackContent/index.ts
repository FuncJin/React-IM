import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/set/account/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FeedbackContentApiRequestData } from './interface'

const url = apiName[1]
const api: HttpApi<FeedbackContentApiRequestData, Response<void>> = (params) => instance({ url, method: 'get', params })

/** 提交对于本平台的反馈内容 */
export const commitFeedbackHttpApi = { url, api }
