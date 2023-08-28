import type { FC } from 'react'

import type { ImgMessage } from '@api/http/url/get/message/interface'
import type { CustomObject } from '@interface/type'

/** 本条消息是图片消息时，由该组件来承载图片的渲染 */
const MessageImg: FC<CustomObject<'img', ImgMessage>> = ({ img }) => (
    <img src={img.url} style={{ width: img.width, height: img.height }} />
)

export default MessageImg
