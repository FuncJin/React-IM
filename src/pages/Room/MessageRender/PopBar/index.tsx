import { previewImg } from '@components/PreviewImg'
import { playVoice } from '@components/PlayVoice'

import { copyContent } from '@utils/device/copyContent'

import type { FC } from 'react'

import type { PopBarType } from './interface'

const PopBar: FC<PopBarType> = ({ msg, type, data }) => (
    <>
        {type === 'img' ? (
            <div>
                <div className="im-m-r-c-msg-feature-body" onClick={() => previewImg({ url: data.url })}>
                    <div>预览图片</div>
                </div>
            </div>
        ) : null}
        {type === 'voice' ? (
            <div>
                <div className="im-m-r-c-msg-feature-body" onClick={() => playVoice({ url: data.url })}>
                    <div>查看语音</div>
                </div>
            </div>
        ) : null}
        {type === 'text' ? (
            <div className="im-m-r-c-msg-feature-body" onClick={() => copyContent(msg, '已复制')}>
                <div>复制内容</div>
            </div>
        ) : null}
    </>
)

export default PopBar
