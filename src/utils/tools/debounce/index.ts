import type { Debounce } from './interface'

/** 防抖 */
export const debounce = ({ every, end, delay }: Debounce) => {
    let timer = null as any
    return function () {
        clearTimeout(timer)
        const args = arguments
        // @ts-ignore
        every.apply(this, args)
        timer = setTimeout(() => {
            // @ts-ignore
            end.apply(this, args)
        }, delay)
    }
}
