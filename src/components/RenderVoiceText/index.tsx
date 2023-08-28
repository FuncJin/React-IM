import VoiceTextIcon from '@components/VoiceTextIcon'

import type { FC } from 'react'

import type { RenderVoiceTextType } from './interface'

import './index.less'

/** 渲染一条语音形式的文字内容 */
const RenderVoiceText: FC<RenderVoiceTextType> = ({ isSelf, text, onClick, duration }) => (
    <div className="im-render-voice-text" onClick={onClick ? onClick : () => {}}>
        <div className="im-r-v-t-icon">
            <VoiceTextIcon isSelf={isSelf} />
        </div>
        [{text} {duration}s]
    </div>
)

export default RenderVoiceText
