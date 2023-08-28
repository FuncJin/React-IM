/** 检查当前设备的类型 */
const checkCurrentDeviceType = () => {
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    const isTablet =
        /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPc = !isPhone && !isAndroid && !isSymbian
    return { isTablet, isPhone, isAndroid, isPc }
}

const _device_cacheVal = checkCurrentDeviceType()

/** 返回当前设备的类型(移动端、平板、PC) */
export const getCurDeviceType = () => {
    // 如果是移动端
    if (_device_cacheVal.isAndroid || _device_cacheVal.isPhone) return 'mobile'
    // 如果是平板
    if (_device_cacheVal.isTablet) return 'tablet'
    // 否则是pc端
    return 'pc'
}
