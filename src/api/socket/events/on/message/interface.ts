import type { PrivateMessage } from '@api/http/url/get/message/friend/interface'
import type { GroupsMessage } from '@api/http/url/get/message/groups/interface'
import type { PrivateMessageInputStateByOn, GroupsMessageBanStateByOn } from '@api/socket/events/on/interface'
import type { CustomValueByStringObject } from '@interface/type'

export type RoomMessage<T> = {
    /** 当前推的消息是否是撤回消息 */
    del?: { time: number }
    /** 当前撤回的消息是否是由重连推来的消息 */
    isReconnection?: boolean
    data: T
}

/** 群聊、私聊的socket */
export type RoomMessageSocket<T> = (data: RoomMessage<T[]>) => void
/** 私聊消息输入状态socket */
export type RoomPrivateMessageInputStateSocket = (data: PrivateMessageInputStateByOn) => void
/** 群聊消息禁言状态socket */
export type RoomGroupsMessageBanStateSocket = (data: GroupsMessageBanStateByOn) => void

/** 聊天消息Socket On */
export type RoomMessageSocketByOnApi = {
    /** 私聊消息相关 */
    private: {
        /** 私聊消息 */
        msg: CustomValueByStringObject<RoomMessageSocket<PrivateMessage>>
        /** 私聊消息状态 */
        state: {
            /** 私聊消息输入状态 */
            input: CustomValueByStringObject<RoomPrivateMessageInputStateSocket>
        }
    }
    /** 群聊消息相关 */
    groups: {
        /** 群聊消息 */
        msg: CustomValueByStringObject<RoomMessageSocket<GroupsMessage>>
        /** 群聊消息状态 */
        state: {
            /** 群聊消息禁言状态 */
            ban: CustomValueByStringObject<RoomGroupsMessageBanStateSocket>
        }
    }
}
