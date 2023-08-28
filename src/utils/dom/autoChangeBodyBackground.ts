import { storage } from '@utils/storage'
import { domMethods } from '@utils/dom'
import { getCurDeviceType } from '@utils/device/curDeviceType'

/** 修改body的背景图片 */
export const autoChangeBodyBackground = () => {
    // 移动端、平板下不加载body的背景图片
    if (getCurDeviceType() !== 'pc') return
    // 首屏下也会加载body的背景图片
    const custom = storage.get('react_im_pc_home_background')
    // 如果用户自定义了主页背景图片，则使用自定义的图片(否则使用默认的主页背景图片)
    const _url = custom ? custom : './images/app_bg.png'
    domMethods.changeBodyBackground(_url)
}
