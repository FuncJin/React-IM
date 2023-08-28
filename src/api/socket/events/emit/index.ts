import { socket } from '@api/socket/connect'
import { apiName } from './apiName'

import type { SocketEventsByEmitApi } from './interface'

export const socketEventsByEmitApi: SocketEventsByEmitApi = {
    private: {
        state: {
            input: (name) => socket.emit(apiName[0], name)
        }
    }
}
