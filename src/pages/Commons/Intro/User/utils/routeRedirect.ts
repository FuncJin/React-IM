import type { FriendAccountRelations } from '@api/http/url/interface/relations'
import type { CustomObject } from '@interface/type'

type RouteRedirect = CustomObject<FriendAccountRelations, (id: string) => string>

/** 用户主页的跳转页面 */
export const routeRedirect: RouteRedirect = {
    self: () => `/setSelfInfo`,
    friend: (id) => `/friends/${id}`,
    stranger: (id) => `/friends/stranger/${id}`
}
