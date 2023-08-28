import type { GroupchatRole } from '@api/http/url/interface/groupchat'

/** 图片消息 */
export type ImgMessage = {
    url: string
    width: string
    height: string
}
/** 语音消息 */
export type VoiceMessage = {
    url: string
    duration: string
}
/** 拍一拍消息 */
export type PattedMessage = {
    /** 前面的格式 */
    before: {
        id: string
        nickname: string
        /** alias属性只在私聊时有效 */
        alias: string
    }
    /** 拍一拍的方式 */
    way: string
    /** 后面的格式 */
    after: {
        id: string
        nickname: string
        text: string
    }
}

/** 群聊撤回消息 */
export type GroupsDelMessage = {
    text: string
    /** 普通成员 */
    member: {
        id: string
        nickname: string
    }
    /** 群主或管理员 */
    operation?: {
        id: string
        nickname: string
        role: GroupchatRole
    }
}
