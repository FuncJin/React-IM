import type { PrivateMessage } from '@api/http/url/get/message/friend/interface'
import type { GroupsMessage } from '@api/http/url/get/message/groups/interface'
import type { RoomBodyContent } from '@pages/Room/Layout/Body/interface'
import type { AccountType } from '@api/http/url/interface/account'

export type ChatRoomMessageType = PrivateMessage | GroupsMessage
export type MapChatType = RoomBodyContent & { oid: string; idType: AccountType }
