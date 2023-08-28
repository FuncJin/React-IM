/** 每次请求所返回的响应数据基本格式 */
export type ResponseData = {
    /** 请求码10000+ */
    code: number
    /** 请求状态 */
    status: 'success' | 'failed'
    /** 响应信息 */
    message: 'ok' | string
    /** 请求所返回的数据(内容) */
    data: any
    /** 是否需要更新本地token */
    token?: string
}
