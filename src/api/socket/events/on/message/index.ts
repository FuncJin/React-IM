import type { RoomMessageSocketByOnApi } from './interface'

/** 聊天消息Socket On Api */
export const proxyRoomMessageSocketByOnApi: RoomMessageSocketByOnApi = {
    private: {
        msg: {},
        state: {
            input: {}
        }
    },
    groups: {
        msg: {},
        state: {
            ban: {}
        }
    }
}
