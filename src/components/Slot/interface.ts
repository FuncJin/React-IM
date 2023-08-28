import type { FC } from 'react'

export type SlotType = {
    /** 要渲染的组件 */
    children: FC<any>
    /** 给组件传递的值 */
    [k: string]: any
}
