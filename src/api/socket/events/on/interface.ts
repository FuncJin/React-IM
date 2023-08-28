import type { HomeMessageList } from '@api/http/url/get/message/home/interface'
import type { PrivateMessage } from '@api/http/url/get/message/friend/interface'
import type { GroupsMessage } from '@api/http/url/get/message/groups/interface'
import type { FriendsList } from '@api/http/url/get/list/friend/interface'
import type { GroupchatList } from '@api/http/url/get/list/groupchat/interface'
import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'
import type { RoomMessage } from './message/interface'

type RoomMessageTypeByData<T> = {
    name: string
    data: T
}

export type PrivateMessageInputStateByOn = RoomMessageTypeByData<{ isEnd: boolean }>
export type GroupsMessageBanStateByOn = RoomMessageTypeByData<{ time: number }>

/** 服务端发来的事件，及事件所对应数据的类型 */
export type SocketEventsByOnArgs = {
    homeMessage: HomeMessageList
    unreadTotalsMessage: number
    unreadTotalsInform: number
    homeFriendsList: FriendsList
    homeGroupchatList: GroupchatList

    privateMessage: RoomMessageTypeByData<RoomMessage<PrivateMessage[]>>
    privateMessageStateInput: PrivateMessageInputStateByOn

    groupsMessage: RoomMessageTypeByData<RoomMessage<GroupsMessage[]>>
    groupsMessageBanState: GroupsMessageBanStateByOn

    friendsCircleList: FriendsCircleContent[]
}
