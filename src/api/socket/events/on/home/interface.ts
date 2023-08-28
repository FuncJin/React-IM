import type { HomeMessageList } from '@api/http/url/get/message/home/interface'
import type { FriendsList } from '@api/http/url/get/list/friend/interface'
import type { GroupchatList } from '@api/http/url/get/list/groupchat/interface'

/** 首页Socket On Api */
export type HomeSocketByOnApi = {
    /** 首页消息未读条数 */
    unreadTotals: {
        /** 首页消息列表的未读条数 */
        index: (limit: number) => void
        /** 首页消息未读通知条数 */
        inform: (totals: number) => void
    }
    /** 首页消息列表 */
    message: (data: HomeMessageList) => void
    /** 首页好友列表 */
    friendsList: (list: FriendsList) => void
    /** 首页群聊列表 */
    groupchatList: (list: GroupchatList) => void
}
