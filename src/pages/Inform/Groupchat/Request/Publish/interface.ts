import type { GroupchatPublishRequest } from '@api/http/url/get/request/groupchat/interface'

/** 发出的群聊申请通知的类型Props */
export type PubType = { publish: GroupchatPublishRequest[] }
/** 同意或拒绝申请时展示的handler信息 */
export type UserInfoNameType = {
    id: string
    nickname: string
}
