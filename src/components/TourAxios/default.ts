export const defaultConfigs = {
    /** 请求失败时触发 */
    failed: {
        end: () => {},
        children: false
    },
    /** 请求之后触发 */
    after: {
        end: () => {},
        children: false
    },
    /** 再次发起请求时触发 */
    resend: {
        is: true,
        feedback: () => {}
    },
    /** 请求中触发 */
    loading: {
        loop: false,
        feedback: () => {}
    }
}
