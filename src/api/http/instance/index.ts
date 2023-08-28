import { message as antdMessage } from 'antd'

import { message as imMessage } from '@components/Message'

import { axiosInstance } from '@api/http/utils/axiosInstance'

import type { ResponseConfigs } from '@api/http/interface/api'
import type { HandleResponse, Instance, InstanceResponse } from '@api/http/interface/instance'

/** 在axios接收到响应后进行一些处理 */
const handleResponse: HandleResponse = ({ end, finallyFunc, data, title, type }) => {
    // 是否自定义了end配置项
    if (end) {
        end.func && end.func(data)
        if (end.isGlobalMessage) {
            // 是否希望通过im提示类型进行请求反馈
            if (end.isGlobalMessage === 'im') imMessage({ title })
            else antdMessage[type](title)
        }
    }
    /**
     *  - 请求成功时，传递成功时的数据
     *  - 请求失败时，传递错误的原因，而不是错误的类型
     */
    const finallyData = type === 'success' ? data : data.message
    finallyFunc && finallyFunc(finallyData)
}

/** api(http)请求函数 */
export const instance: Instance = (config) => {
    /** 默认配置 */
    let _end: ResponseConfigs = { succeed: {}, failed: {}, finally: () => {} }
    // 立即发起请求(异步)
    const _promise = axiosInstance(config)
    // 由_promise代为接收本次所获得的响应
    _promise
        .then((res) => {
            const { type, data } = res as unknown as InstanceResponse
            // 处理请求成功或请求失败(由于instance的缘故，所以通过type来标识成功还是失败，而不是reject状态下的Promise)
            handleResponse({
                end: type === 'success' ? _end.succeed : _end.failed,
                finallyFunc: _end.finally,
                data,
                title: data,
                type
            })
            // 继续传递数据
            return data
        })
        .catch((err) => {
            // 这个catch用来处理axios请求之前所抛出的错误
            // eslint-disable-next-line
            console.error(err)
        })
    return (end) => {
        // 通过闭包的形式让_promise可以根据自定义好的请求配置进行相应处理
        end && (_end = end)
        /**
         * 此处之所以返回promise对象，是因为这样可以拥有更好的选择性，例如以下两种使用形式：
         * 1. instance(请求参数)(响应配置);
         *    上述方式为配置式axios请求，这意味着响应的数据只会在配置对象中进行相应处理
         * 2. const data: any = await instance(请求参数)();
         *    这种方式没有传入响应配置，所以本次请求的结果(无论成功还是失败。注意，失败时错误依然会被捕获)，都会返回给data，
         *    但data会是any类型，所以在使用这种方式时，需要手动指定好响应数据的类型
         */
        return _promise
    }
}
