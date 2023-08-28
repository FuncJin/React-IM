import type { GroupChatBasisInfo, GroupchatRole } from '@api/http/url/interface/groupchat'
import type { CustomObject } from '@interface/type'

/**
 * 在当前群聊中
 * - 身份可能是群主、管理员、普通成员
 * - 或不在当前群聊中
 */
type Groupchat = GroupChatBasisInfo & {
    avatar: string
    background: string
    host: {
        id: string
        nickname: string
        avatar: string
    }
    time: number
    totals: number
    tags: CustomObject<string, string[]>
}

export type IntroGroupchat = {
    /** id类型 */
    type: 'stranger' | GroupchatRole
    info: Groupchat
}
