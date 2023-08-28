import axios from 'axios'
import Qs from 'querystring'

import { message as antdMessage } from 'antd'

import { storage } from '@utils/storage'
import { constant } from '@constant'
import { httpUrlConfigs } from './httpUrlConfigs'
import { handleApiCodeErrors } from './errors'

import type { ResponseData } from '@api/http/interface/response'
import type { InstanceResponse } from '@api/http/interface/instance'

/** axios */
export const axiosInstance = axios.create({
    baseURL: constant.env.url.api.http,
    timeout: 1000 * 15,
    transformRequest: [(data) => (data?.constructor === FormData ? data : Qs.stringify(data))]
})
/** 取消请求 */
const CancelToken = axios.CancelToken
const source = CancelToken.source()
// POST默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/** 存储当前正在发送的请求（此时还未收到响应） */
const requestContainer = new Set<string>([])

axiosInstance.interceptors.request.use(
    (config) => {
        const { url } = config
        /** 取消本次请求 */
        const cancel = (reason?: string) => {
            config.cancelToken = source.token
            source.cancel(reason)
        }
        // 所有以/get开头的请求，都默认视为并行请求
        if (!/^\/get\//.test(url!)) {
            // 是否属于串行请求
            if (!httpUrlConfigs.concurrency.find((_url) => _url === url)) {
                // 是否存在上次请求未完成的情况
                if (requestContainer.has(url!)) {
                    cancel()
                    antdMessage.warn('正在加载')
                    return config
                }
                requestContainer.add(url!)
            }
        }
        // 如果是不需要进行鉴权的接口，则直接发送
        if (httpUrlConfigs.noVerify.find((_url) => _url === url)) return config
        // 需要进行鉴权(只要token存在，无论是否有效，一律发起本次请求)
        const token = storage.get('react_im_token')
        if (!token) {
            cancel()
            // 没有token时，跳转到首页
            window.location.href = '/'
            return config
        }
        // 携带token（注意，如果此处使用解构赋值的形式，则config会覆盖全局axios的默认配置）
        config.headers!.Authorization = `Bearer ${token}`
        return config
    },
    (err) => antdMessage.error('网络错误')
)

axiosInstance.interceptors.response.use(
    (response) => {
        const { url } = response.config
        // 无论串行还是并行，直接在请求容器中删除当前接口
        requestContainer.delete(url!)
        // 处理响应
        const { code, status, message, data, token } = response.data as ResponseData
        // 如果需要进行无感刷新token
        if (token) storage.set('react_im_token', token)
        // 状态码为success时，状态码为10000(此处的type是为了给instance标识)
        const _data: InstanceResponse = { type: 'success', data }
        if (status === 'success') return _data as any
        // 处理其它等级的状态码
        return handleApiCodeErrors(code, message)
    },
    (err) => antdMessage.error('网络错误')
)
