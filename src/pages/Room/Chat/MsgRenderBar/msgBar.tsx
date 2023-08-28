import RenderVoiceText from '@components/RenderVoiceText'

import Img from '@pages/Room/MessageRender/Img'

import type { ImgMessage, VoiceMessage } from '@api/http/url/get/message/interface'
import type { MsgBarArgs } from './interface'

export const msgBar = {
    /** 图片消息 */
    img: ({ setCurMsgId, time, data }: MsgBarArgs<ImgMessage>) => (
        <div className="im-m-r-c-m-r-content im-m-r-c-m-r-content-img" onClick={() => setCurMsgId(time)}>
            <Img img={data} />
        </div>
    ),
    /** 语音消息 */
    voice: ({ setCurMsgId, time, isSelf, data }: MsgBarArgs<VoiceMessage>) => (
        <div className="im-m-r-c-m-r-content" onClick={() => setCurMsgId(time)}>
            <RenderVoiceText isSelf={isSelf} text="语音" {...data} />
        </div>
    )
}
