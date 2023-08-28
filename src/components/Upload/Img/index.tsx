import { useState, memo, useEffect } from 'react'

import { message as antdMessage, Upload } from 'antd'
import { LoadingOutlined, PictureOutlined } from '@ant-design/icons'

import { drawer } from '@components/Drawer'
import { message } from '@components/Message'

import type { FC } from 'react'
import type { RcFile } from 'antd/es/upload/interface'

import type { UploadImgType } from './interface'

import './index.less'

/** 支持上传的图片格式 */
const mimetype = ['jpeg', 'jpg', 'png']

/** 上传图片组件 */
const Img: FC<UploadImgType> = ({
    title,
    url,
    imgApi,
    succeed,
    onPreview,
    feedbackByIm,
    customUploadFunc,
    cancel,
    cancelText
}) => {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [hoverTitle] = useState(title?.hover ? title.hover : '上传图片')
    const [uploadTitle] = useState(title?.upload ? title.upload : '当前为预览内容，你确定要上传该图片吗？')
    /** 上传图片 */
    const uploadApi = async (file: RcFile) => {
        // 加载动画
        setLoading(true)
        // 开始上传
        const result = await imgApi!(file)
        // 上传完毕
        setLoading(false)
        // 取消预览状态
        setPreview('')
        succeed && succeed(result)
    }
    /** 取消上传 */
    const _cancel = () => {
        // 将图片恢复为原先的状态
        setPreview(url ? url : '')
        cancel && cancel()
    }
    const beforeUpload = async (file: RcFile) => {
        const isTypeOk = mimetype.find((type) => file.type === `image/${type}`)
        if (!isTypeOk) return antdMessage.error(`仅支持${mimetype.join('、')}格式的图片`)
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) return antdMessage.error('图片最大支持2MB')
        // 本地预览
        const url = URL.createObjectURL(file)
        setPreview(url)
        onPreview && onPreview(url)
        const uploadImg = () => {
            if (customUploadFunc) return customUploadFunc(file)
            uploadApi(file)
        }
        let _cancelText = cancelText ? cancelText : '放弃上传'
        if (feedbackByIm) {
            message({
                title: uploadTitle,
                options: [
                    { text: _cancelText, click: _cancel },
                    { text: '确定', color: 'red', click: uploadImg }
                ],
                blockShow: true
            })
            return false
        }
        drawer({
            title: uploadTitle,
            list: [{ text: '确定', color: 'red', click: uploadImg }],
            backTitle: {
                title: _cancelText,
                back: _cancel
            }
        })
        return false
    }
    useEffect(() => {
        if (url && !preview) setPreview(url)
    }, [url])
    return (
        <Upload showUploadList={false} disabled={loading} beforeUpload={beforeUpload}>
            <div className="im-panel-upload" title={hoverTitle}>
                {preview || url ? <img src={preview || url} /> : <PictureOutlined className="im-p-u-default-img" />}
                {loading ? (
                    <div className="im-p-u-loading-bounce">
                        <LoadingOutlined />
                    </div>
                ) : null}
            </div>
        </Upload>
    )
}

export default memo(Img)
