import type { AxiosResponse } from 'axios'

import type { ResponseConfigs } from './api'
import type { ApiConfigs } from './configs'

/** 每个请求函数的配置项 */
type HandleResponseType = {
    end: ResponseConfigs['succeed']
    finallyFunc: ResponseConfigs['finally']
    data: any
    title: string
    type: 'success' | 'error'
}

export type HandleResponse = (data: HandleResponseType) => void

export type Instance = (config: ApiConfigs) => (end?: ResponseConfigs) => Promise<AxiosResponse<any, any>>

export type InstanceResponse = {
    type: 'success' | 'error'
    data: any
}
