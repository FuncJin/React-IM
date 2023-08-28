export type AdaptationData = {
    /** 当前系统的主题模式 */
    theme: ThemeScheme
    /** 切换至浅色模式时调用(允许多个地方监听) */
    light: Function[]
    /** 切换至深色模式时调用(允许多个地方监听) */
    dark: Function[]
}

/** 支持的主题方案 */
export type ThemeScheme = 'normal' | 'dark'

/** 支持的主题方案配色 */
export type ThemeSchemeColors = '#ffffff' | '#000000'
