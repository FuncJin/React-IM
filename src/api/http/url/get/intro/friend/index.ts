import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/intro/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { IntroUser } from './interface'

const url = apiName[0]

/** 获取指定用户的个人主页简介(当前用户与指定用户的关系不同，则返回的数据也不同 */
export const getIntroByFriendRelationHttpApi: HttpApi<string, Response<IntroUser>> = (id) =>
    instance({ url, method: 'get', params: { id } })
