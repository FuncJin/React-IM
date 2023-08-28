/** 网络请求的自定义错误类型 */
export class HttpError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'HttpError'
        this.message = message
    }
}
