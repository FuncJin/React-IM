import type { GroupchatRole } from '@api/http/url/interface/groupchat'
import type { GroupsMessageStyle } from '@api/http/url/get/message/msgStyle'

export type GroupsMsgApiRequestData = {
    id: string
    page: number
}
/** 群聊消息的每条消息的基本格式 */
export type GroupsMessage = GroupsMessageStyle & {
    id: string
    avatar: string
    nickname: string
    role: GroupchatRole
    msg: string
    time: number
}
