import io from 'socket.io-client'

import { storage } from '@utils/storage'
import { constant } from '@constant'
import { on } from './events/on'

import type { Socket } from 'socket.io-client'

export let socket = null as unknown as Socket

/** 与服务器建立websocket连接 */
const connection = (isReconnection?: string) => {
    const _socket = io(constant.env.url.api.socket, {
        // 身份认证
        auth: { token: storage.get('react_im_token') },
        // 自定义参数
        query: { isReconnection }
    })
    socket = _socket
    // 注册事件
    on()
    return _socket
}

/** 手动断开与服务器的websocket连接 */
const close = () => socket.close()

export const websocket = { connection, close }
