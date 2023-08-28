/** 全局预览图片的组件类型 */
export type PreviewImgType = {
    /** 要预览的图片(url) */
    url: string
    /** 预览组件挂载后会调用该函数 */
    init?: () => void
    /** 预览结束时调用该函数 */
    cancel?: () => void
}
