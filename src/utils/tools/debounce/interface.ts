export type Debounce = {
    /** 每次都会执行 */
    every: Function
    /** 延迟结束后执行 */
    end: Function
    /** 延迟时间(ms) */
    delay: number
}
