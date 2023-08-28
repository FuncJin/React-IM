import type { RcFile } from 'antd/es/upload/interface'

export type UploadImgType = {
    title?: {
        /** 鼠标移至上传组件时展示的文字 */
        hover?: string
        /** 上传图片时的标题 */
        upload?: string
    }
    /** 展示的图片 */
    url?: string
    /** 上传时调用的接口（函数），该函数的第一个参数为文件类型File */
    imgApi?: (file: RcFile) => Promise<any>
    /** 上传成功时调用的方法(该函数会收到上传成功后的响应数据) */
    succeed?: (result: any) => void
    /** 预览效果(选择完图片后，会调用函数，且该函数会收到此预览图片的本地url) */
    onPreview?: (url: string) => void
    /** 提示预览时的展示方式是否采用im类型，默认为drawer */
    feedbackByIm?: true
    /**
     * 自定义上传图片
     *
     * 若指定了该配置项，则上传图片组件只具有预览图片的功能（不包含执行上传图片的api、加载动画等等）
     *
     * 该函数的第一个参数为要上传的图片
     */
    customUploadFunc?: (file: RcFile) => void
    /** 取消上传时调用的函数 */
    cancel?: () => void
    /** 取消上传的文字(默认为放弃上传) */
    cancelText?: string
}
