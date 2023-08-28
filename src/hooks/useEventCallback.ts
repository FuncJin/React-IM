import { useRef, useCallback, useLayoutEffect } from 'react'

/** 解决使用useCallback时造成的闭包问题 */
export const useEventCallback = <T extends (...args: any[]) => any>(fn: T) => {
    const ref = useRef(fn)
    useLayoutEffect(() => {
        ref.current = fn
    })
    return useCallback(((...args) => ref.current.call(window, ...args)) as T, [])
}
