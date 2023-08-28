import type { ReactNode, MouseEvent } from 'react'

/** 抽屉选项的单击事件 */
export type DrawerButtonClick = (ev: MouseEvent<HTMLParagraphElement>) => void

/** 抽屉中的每个选项 */
type DrawerList = {
    /** 文字内容 */
    text: ReactNode
    /** 单击事件 */
    click?: DrawerButtonClick
    /** 文字颜色 */
    color?: 'red' | 'blue'
}

/** 抽屉的类型 */
export type DrawerType = {
    /** 上方标题 */
    title?: ReactNode
    /** 选项 */
    list: DrawerList[]
    /** 下方取消抽屉的标题 */
    backTitle?: {
        title: ReactNode
        back?: () => void
    }
}
