/** instance支持的请求方式 */
type Methods = {
    get: { method: 'get'; params?: any }
    post: { method: 'post'; data?: any }
}

/** 请求函数的实例配置项 */
export type ApiConfigs = (Methods['get'] | Methods['post']) & {
    url: string
    headers?: any
}
