import type { FC, ReactNode, MouseEvent } from 'react'

/** 选项单击事件 */
export type MessageButtonClick = (ev: MouseEvent<HTMLButtonElement>) => void

export type Feedback = {
    text?: ReactNode
    color?: 'red' | 'blue' | 'yellow' | 'green'
    weight?: '500' | '600' | '700'
    click?: MessageButtonClick
}
export type MessageType = {
    /** 标题 */
    title: ReactNode
    /** 消息主体信息 */
    Children?: ReactNode | FC<any>
    /** 主体信息是否居中 */
    center?: boolean
    /** 要渲染的选项（0-n，当为0时，Message会有一个默认选项） */
    options?: Feedback[]
    /** 即使只有两个选项时，是否水平块级显示 */
    blockShow?: boolean
    /** 消息组件挂载后调用该函数 */
    init?: () => void
}
