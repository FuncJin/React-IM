import type { GroupchatRole } from '@api/http/url/interface/groupchat'

export type RenderSingleGroupsMsg = {
    delMsg: (del: string, time: number) => void
    selfRole: GroupchatRole
    gid: string
}
