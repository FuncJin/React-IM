import { storage } from '@utils/storage'
import { defaultTheme } from './defaultTheme'

import type { AdaptationData } from './interface'
import type { ThemeScheme } from './interface'

const themeContainer: AdaptationData = {
    theme: 'normal',
    light: [],
    dark: []
}

/**
 * 查询当前系统是深色还是浅色模式，并监听系统主题的切换
 * @returns {
 *      theme: 当前系统是深色还是浅色，值为light、dark
 *
 *      light: 当监听到系统切换为浅色模式时调用
 *
 *      dark: 当监听到系统切换为深色模式时调用
 * }
 */
const topicAdaptation = () => themeContainer

/** 切换主题 */
const changeTheme = (theme: ThemeScheme, order: number) => {
    // 更改当前主题
    themeContainer.theme = theme
    // 切换css主题
    document.documentElement.setAttribute('theme', theme)
    // 记录编号
    storage.set('react_im_cur_theme_scheme_order', order)
}

/** 媒体查询 */
const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
if (mediaQuery) {
    const handle = (isInit: boolean) => {
        if (storage.get('react_im_auto_theme') === 1) {
            // 只有开启了自动切换，才进行监听
            if (mediaQuery.matches) {
                // 深色模式
                themeContainer.theme = 'dark'
                changeTheme('dark', 1)
                themeContainer.dark.forEach((f) => f())
            } else {
                if (isInit) return
                // 浅色模式
                themeContainer.theme = 'normal'
                changeTheme('normal', 0)
                themeContainer.light.forEach((f) => f())
            }
        }
    }
    handle(true)
    // 监听系统模式变化(跟随系统)
    mediaQuery.addEventListener('change', () => handle(false))
}

export const appTheme = { topicAdaptation, changeTheme, defaultTheme, isDark: () => mediaQuery?.matches }
