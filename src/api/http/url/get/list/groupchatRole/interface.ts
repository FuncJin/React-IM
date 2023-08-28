import type { GroupchatRole, GroupchatMemberRoleList } from '@api/http/url/interface/groupchat'

export type GroupchatSinglePerson = {
    id: string
    avatar: string
    nickname: string
    role: GroupchatRole
}
export type GroupchatPersonList = {
    title: string
    list: GroupchatSinglePerson[]
}

export type GroupchatMemberRoleApiRequestData = {
    id: string
    type: GroupchatMemberRoleList
}
/** 群聊成员信息的数据返回格式 */
export type GroupchatPersonInfo = {
    totals: number
    info: GroupchatPersonList[]
}
