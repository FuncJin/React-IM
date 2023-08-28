import JSConfetti from 'js-confetti'

import { message as antdMessage } from 'antd'

import { storage } from '@utils/storage'
import { domMethods } from '@utils/dom'
import { appTheme } from '@utils/theme'
import { getCurDeviceType } from '@utils/device/curDeviceType'
import { constant } from '@constant'

/** 开发环境VConsole */
const vconsole = () => (constant.env.type === 'dev' ? new window.VConsole() : null)

/** 首屏欢迎特效 */
const indexConfetti = () => {
    const canvas = document.querySelector('#im-confetti') as HTMLCanvasElement
    if (!['/message', '/contacts', '/friendsCircle'].includes(window.location.pathname)) return canvas.remove()
    const jsConfetti = new JSConfetti({ canvas })
    setTimeout(async () => {
        const confetti = storage.get('react_im_index_confetti')
        if (!confetti) return canvas.remove()
        antdMessage.success({ content: `${storage.get('react_im_user_nickname')}，欢迎回访`, duration: 2 })
        // 由于pc端、移动端下表情大小有问题，所以如果是移动端访问，则将表情的尺寸变大一些
        const _deviceType = getCurDeviceType()
        const emojiSize = _deviceType === 'pc' ? 20 : 80
        await jsConfetti.addConfetti({ ...confetti.configs, emojiSize })
        // 清除画布内容
        jsConfetti.clearCanvas()
        canvas.remove()
    }, 650)
}

/** 修改body的背景图片 */
const changeBackground = () => {
    // 首屏下不加载body的背景图片
    if (window.location.pathname === '/' || window.location.pathname === '/index') return
    domMethods.autoChangeBodyBackground()
}

/** 修改面板尺寸 */
const changePanelSize = () => {
    const panel = storage.get('react_im_custom_panel_size')
    // 如果未自定义面板尺寸
    if (!panel) return
    // 修改面板尺寸
    const rootDom = document.querySelector('#root') as HTMLDivElement
    rootDom.style.width = panel.width
    rootDom.style.height = panel.height
}

/** 初始化主题样式 */
const transformTheme = () => {
    const { topicAdaptation, changeTheme, defaultTheme } = appTheme
    // 是否跟随系统自动切换主题
    const autoOrder = storage.get('react_im_auto_theme')
    if (autoOrder) {
        // 初始化时对主题自适应(主题编号)
        if (autoOrder === 1) {
            const proxy = topicAdaptation()
            // 在开启了自动切换后，如果当前系统主题为深色，那么就切换为深色主题
            if (proxy.theme === 'dark') changeTheme('dark', 1)
            // 如果当前系统主题为浅色，那么就什么也不做
        }
    }
    // 是否有自定义主题样式
    const customThemeOrder = storage.get('react_im_cur_theme_scheme_order')
    if (customThemeOrder) {
        const [en] = defaultTheme[customThemeOrder]
        // 切换至自定义主题
        changeTheme(en, customThemeOrder)
    }
}

/**
 * 世间最美好的东西莫过于有几个头脑和心地都很正直的、严正的朋友。
 *
 *                                              ——爱因斯坦
 */
const print = () => {
    // eslint-disable-next-line
    console.log(
        '\n世间最美好的东西莫过于有几个头脑和心地都很正直的、严正的朋友。    \n\n                                             —— 爱因斯坦\n\n'
    )
}

const queue = [
    vconsole,
    print,
    changePanelSize,
    transformTheme,
    changeBackground,
    domMethods.pageVisibility.bindPageVisibilityChangeEv,
    indexConfetti
]

/** 初始化任务 */
export const initialize = () => queue.forEach((f) => f())
