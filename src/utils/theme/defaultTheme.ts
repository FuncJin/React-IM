import type { ThemeScheme, ThemeSchemeColors } from './interface'

/** 默认提供的系统主题(默认主题为标准，即浅色模式) */
export const defaultTheme: Array<[ThemeScheme, string, ThemeSchemeColors]> = [
    ['normal', '浅色', '#ffffff'],
    ['dark', '深色', '#000000']
]
