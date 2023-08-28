import type { GroupchatRole } from '@api/http/url/interface/groupchat'
import type { CustomObject } from '@interface/type'

type RouteRedirect = CustomObject<GroupchatRole | 'stranger', (id: string) => string>

/** 群聊主页的跳转页面 */
export const routeRedirect: RouteRedirect = {
    host: (id) => `/groupchat/host/${id}`,
    admins: (id) => `/groupchat/admins/${id}`,
    commons: (id) => `/groupchat/commons/${id}`,
    stranger: (id) => `/groupchat/stranger/${id}`
}
