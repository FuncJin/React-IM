import type { VoiceMessage } from '@api/http/url/get/message/interface'

export type RenderVoiceTextType = VoiceMessage & {
    isSelf: boolean
    text: string
    onClick?: () => void
}
