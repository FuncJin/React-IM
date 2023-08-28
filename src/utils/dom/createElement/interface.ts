import type { MessageType } from '@components/Message/interface'
import type { DrawerType } from '@components/Drawer/interface'
import type { PreviewImgType } from '@components/PreviewImg/interface'
import type { PlayVoiceType } from '@components/PlayVoice/interface'

/** 支持的createElement类型 */
export type CreateElementType = {
    (type: 'message', props: MessageType): void
    (type: 'drawer', props: DrawerType): void
    (type: 'previewImg', props: PreviewImgType): void
    (type: 'playVoice', props: PlayVoiceType): void
}

/** 通过createElement所创建全局dom组件时的公有props */
export type GlobalCreateElementComponent<T = any> = T & {
    /** 关闭时调用 */
    close: Function
    /** 是否应用背景色 */
    isBg: boolean
}
