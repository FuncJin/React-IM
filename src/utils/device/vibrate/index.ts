/** 使手机振动 */
export const doVibrate = (dur: number) => {
    const navigator = window.navigator as any
    if (!('vibrate' in navigator)) return
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
    if (!navigator.vibrate) return
    navigator.vibrate(dur)
}
