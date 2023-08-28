import type { PrivateMessageStyle } from '@api/http/url/get/message/msgStyle'

export type PrivateMsgApiRequestData = {
    id: string
    page: number
}
/** 好友双方聊天记录中每条消息的格式 */
export type PrivateMessage = PrivateMessageStyle & {
    id: string
    avatar: string
    msg: string
    time: number
}
