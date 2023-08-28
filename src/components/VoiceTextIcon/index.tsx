import type { FC } from 'react'

import type { VoiceTextIconType } from './interface'

import './index.less'

/** 语音气泡时的图标 */
const VoiceTextIcon: FC<VoiceTextIconType> = ({ isSelf }) => (
    <div className={`im-voice-text-icon ${isSelf ? 'im-voice-text-icon-self' : 'im-voice-text-icon-other'}`}>
        <div />
        <div className="im-v-t-i-c" />
        <div className="im-v-t-i-m" />
        <div className="im-v-t-i-c" />
        <div />
    </div>
)

export default VoiceTextIcon
