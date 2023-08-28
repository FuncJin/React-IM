import { domMethods } from '@utils/dom'

import type { PlayVoiceType } from './interface'

/** 全局播放语音 */
export const playVoice = (props: PlayVoiceType) => domMethods.createElement('playVoice', props)
