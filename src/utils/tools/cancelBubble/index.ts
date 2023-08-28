import type { SyntheticEvent } from 'react'

/** 取消事件冒泡与默认行为 */
export const cancelBubble = (ev: SyntheticEvent) => {
    ev.stopPropagation()
    ev.nativeEvent.stopImmediatePropagation()
}
