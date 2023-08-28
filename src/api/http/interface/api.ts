/** 处理响应数据的配置项(成功或失败) */
type HandleResponseConfigs<T> = {
    /** 请求结束时调用（该函数会收到本次请求所得到的响应） */
    func?: (data: T) => void
    /**
     * 在请求结束时，是否通过全局的消息组件进行提示(在不设置该配置项的情况下，无论成功还是失败，都不会进行全局消息提示)
     * 全局消息组件的提示类型分为两种：imMessage、antdMessage
     */
    isGlobalMessage?: 'im' | 'antd'
}

/** 请求函数所返回的回调函数的配置项 */
export type ResponseConfigs<T = any, U = any> = {
    /** 请求成功时的操作 */
    succeed?: HandleResponseConfigs<T>
    /** 请求失败时的操作 */
    failed?: HandleResponseConfigs<U>
    /**
     * 无论成功还是失败，都会调用该函数
     * - 在请求成功时，该函数收到的是成功的响应数据
     * - 在请求失败时，该函数收到的是请求失败的响应数据
     *
     * finally的执行时机在配置项succeed和failed的后面
     */
    finally?: (data: T | U) => void
}
/** 指定响应所返回的数据格式 */
export type Response<S = string, F = string> = {
    /** success为成功时收到的数据 */
    succeed: S
    /** failure为失败时收到的数据 */
    failed: F
}
/**
 * api
 * - RequestData为本次请求要携带的参数
 * - ResponseData为本次请求结束后，响应成功或响应失败所收到的数据(无论成功还是失败，此两者均默认为string)
 */
export type HttpApi<RequestData = void, ResponseData = unknown> = (
    data: RequestData
) => (
    responseConfigs?: ResponseConfigs<
        ResponseData extends Response<any, any> ? ResponseData['succeed'] : string,
        ResponseData extends Response<any, any> ? ResponseData['failed'] : string
    >
) => Promise<any>
