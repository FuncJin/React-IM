import { instance } from '@api/http/instance'
import { apiName } from '@api/http/url/get/system/apiName'

import type { HttpApi, Response } from '@api/http/interface/api'
import type { FriendsCircleRoleConfigType } from '@api/http/url/interface/friendsCircle'

const url = apiName[1]

const request = (type: string) => ({ url, method: 'get', params: { type } } as const)

const lifeState: HttpApi<void, Response<string[]>> = () => instance(request('life_state'))
const delTip: HttpApi<void, Response<string[]>> = () => instance(request('del_tip'))
const role: HttpApi<void, Response<FriendsCircleRoleConfigType[]>> = () => instance(request('friends_circle_role'))
const time: HttpApi<void, Response<number[]>> = () => instance(request('friends_circle_time'))

/** 获取平台默认配置项 */
export const getSystemConfigsHttpApi = {
    acc: {
        lifeState,
        delTip
    },
    friendsCircle: {
        role,
        time
    }
}
