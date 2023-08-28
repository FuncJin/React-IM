import { noVerify } from './apiName/noVerify'
import { concurrency } from './apiName/concurrency'

export const httpUrlConfigs = {
    /** 不需要进行鉴权的请求 */
    noVerify,
    /**
     * 每个请求的请求机会分为两种：串行请求、并行请求，以请求A举例：
     * - 串行请求：在上一个请求A发出并接收到响应后，才可发出下一个请求A
     * - 并行请求：在同一时间段，可以同时发出多个请求A
     *
     * 注意，所有的请求均默认为串行请求(除了以/get开头的请求外)
     */
    /** 要指定的并发类api请求路径 */
    concurrency
}
