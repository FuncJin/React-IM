import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/intro/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { IntroGroupchat } from './interface'

const url = apiName[1]

/** 获取指定群聊的主页(将根据当前用户与该群聊的关系，返回不同的数据)  */
export const getIntroByGroupchatRelationHttpApi: HttpApi<string, Response<IntroGroupchat>> = (id) =>
    instance({ url, method: 'get', params: { id } })
