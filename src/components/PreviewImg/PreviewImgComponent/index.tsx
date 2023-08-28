import { useState, useEffect } from 'react'

import type { FC } from 'react'

import type { PreviewImgType } from '@components/PreviewImg/interface'
import type { GlobalCreateElementComponent } from '@utils/dom/createElement/interface'

import './index.less'

/** 全局预览图片 */
const PreviewImg: FC<GlobalCreateElementComponent<PreviewImgType>> = ({ url, init, cancel, isBg, close }) => {
    // 预览的开关状态
    const [state, setState] = useState(true)
    const cancelPreview = () => {
        cancel && cancel()
        setState(false)
        setTimeout(close, 300)
    }
    useEffect(() => {
        init && init()
    }, [])
    return (
        <div
            className={`im-dialog-preview-img ${isBg ? 'im-dialog-preview-img-bg' : ''} ${
                state ? '' : 'im-dialog-preview-img-bounce-h'
            }`}
            onClick={cancelPreview}>
            <div className={`im-d-p-i-box ${state ? '' : 'im-dialog-preview-img-body-bounce-h'}`}>
                <img src={url} />
            </div>
        </div>
    )
}

export default PreviewImg
