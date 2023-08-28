const check = () => {
    /** 获取当前设备的宽度 */
    const width = document.documentElement.clientWidth
    // 应展示的大小
    /**
     * 10: 在最适合的设备下的最佳大小
     * 768: 最适合的设备尺寸，768为平板的屏幕宽度
     */
    const init = 10 * (width / 768)
    // 大小最大不能超过13，最小不能低于10
    const size = init > 13 ? 13 : init < 10 ? 10 : init
    document.documentElement.style.fontSize = `${size}px`
}
window.addEventListener('load', check)
window.addEventListener('resize', check)
