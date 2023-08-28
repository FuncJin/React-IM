/** 在被监听的dom进入可视区域时，触发cb */
export const intersectionObserver = (dom: any, callback: Function) => {
    const observer = new IntersectionObserver((a) => {
        if (!a[0].isIntersecting) return
        callback()
        // 取消观察
        observer.unobserve(dom)
    })
    // 观察
    observer.observe(dom)
}
