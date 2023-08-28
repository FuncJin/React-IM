import type { ReactNode, MouseEventHandler } from 'react'

import type { CustomKeyByObject } from '@interface/type'

export type CommonRowListType = {
    /** 是否需要图标 */
    icon?: ReactNode
    /** 左侧文字标题 */
    text: ReactNode
    /** 当左侧文字标题为空时，展示的内容 */
    textNull?: ReactNode
    /** 左侧文字子标题 */
    subTitle?: ReactNode
    /** 是否应用主色 */
    primaryColor?: boolean
    /** 是否有下边框线 */
    border?: boolean
    /** 右侧描述性文字 */
    description?: ReactNode
    /** 单击函数 */
    click?: MouseEventHandler<HTMLElement>
    /** 是否展示右侧箭头(默认false) */
    more?: boolean
    /** 是否希望当前选项展示加载动画(该选项的优先级大于selected选项) */
    isLoading?: boolean
    /** 路由配置项，如果配置了该项，则代表当前CommonRow为路由跳转 */
    to?: {
        pathname: string
        state?: CustomKeyByObject<any>
    }
    /** 自定义当前行的背景色与文字颜色 */
    colors?: {
        bg?: string
        text?: string
    }
    /** 鼠标移动到该行时所展示的指针提示(同H5 Title) */
    hoverTip?: string
}

export type CommonRowType = {
    /** 上方小标题 */
    title?: ReactNode
    /** 下方注释 */
    comment?: ReactNode
    /** 列表项 */
    list?: CommonRowListType[]
    /** 该列表项是否是一个单选列表(值为当前选中项的索引) */
    selected?: number
}
