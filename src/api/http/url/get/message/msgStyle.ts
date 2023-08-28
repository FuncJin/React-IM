import type { ImgMessage, VoiceMessage, PattedMessage, GroupsDelMessage } from './interface'

/** 消息样式key */
export type MessageStyleType = 'text' | 'del' | 'img' | 'voice' | 'patted'

/** 私聊消息样式 */
export type PrivateMessageStyle =
    | { type: 'text'; data: string }
    | { type: 'del'; data: string }
    | { type: 'img'; data: ImgMessage }
    | { type: 'voice'; data: VoiceMessage }
    | { type: 'patted'; data: PattedMessage }

/** 群聊消息样式 */
export type GroupsMessageStyle =
    | { type: 'text'; data: string }
    | { type: 'del'; data: GroupsDelMessage }
    | { type: 'img'; data: ImgMessage }
    | { type: 'voice'; data: VoiceMessage }
    | { type: 'patted'; data: PattedMessage }
