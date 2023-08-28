import { useRef, useEffect } from 'react'

/** 在state变化时调用，而不在初始挂载后调用 */
export const useDidUpdateEffect = (cb: () => void, depend: any[]) => {
    const ref = useRef(true)
    useEffect(() => {
        if (ref.current) {
            ref.current = false
            return
        }
        cb()
    }, depend)
}
