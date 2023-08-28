import type { ReactNode } from 'react'

import type { PageHeaderType } from '@components/PageHeader/interface'

export type SideslipType = PageHeaderType & {
    children: ReactNode
    /** 页面（不包含header部分）是否只有文字 */
    isOnlyText?: boolean
    /** 是否给内容区域设置padding */
    isPadding?: boolean
    /** 返回上一级页面时，是否自动执行路由forward(默认true) */
    isForward?: boolean
}
