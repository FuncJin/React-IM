import type { UploadImgType } from '@components/Upload/Img/interface'
import type { EmojiType } from '@components/Emoji/interface'
import type { RecordAudioType } from '@components/RecordAudio/interface'

export type MessageStrExtendsType = {
    /** 表情 */
    emoji: EmojiType
    /** 图片 */
    img: UploadImgType
    /** 语音(录音) */
    voice?: RecordAudioType
}
