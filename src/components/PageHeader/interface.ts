import type { ReactNode } from 'react'

export type PageHeaderType = {
    /** 是否显示页面标题。默认为true，当配置了该项为false时，需注意Sideslip页面的返回方式 */
    isPageHeader?: boolean
    /** 居中标题 */
    title?: ReactNode
    /** 上一个页面 */
    preTitle?: {
        /** 左侧标题 */
        title?: string
        /** 不存在back时，Sideslip将销毁自身（由于z-index的缘故，其实preTitle中并不需要back） */
        back?: () => void
    }
    /** 下一个页面 */
    nextTitle?: {
        /** 右侧标题 */
        title: string
        next: () => void
    }
    /** 是否希望页面的header部分以脱离文档流的方式显示 */
    isHeaderFloat?: boolean
    /** 整体的背景颜色 */
    isWhiteBgColor?: boolean
    /** 是否希望在主标题后面显示加载动画 */
    isLoading?: boolean
}
