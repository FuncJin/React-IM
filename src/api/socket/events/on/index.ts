import { socket } from '@api/socket/connect'
import { proxyRoomMessageSocketByOnApi } from './message'
import { proxyHomeSocketByOnApi } from './home'
import { proxyFriendsCircleSocketByOnApi } from './friendsCircle'
import { apiName } from './apiName'

import type { SocketEventsByOnArgs } from './interface'

export const on = () => {
    // 服务器不允许建立此次连接(或连接失败)
    socket.on('connect_error', (err) => {})
    // 断开连接时触发
    socket.on('disconnect', () => {})
    // 首页消息列表
    socket.on(apiName[0], (list: SocketEventsByOnArgs['homeMessage']) => proxyHomeSocketByOnApi.message(list))
    // 首页消息未读条数
    socket.on(apiName[1], (limit: SocketEventsByOnArgs['unreadTotalsMessage']) =>
        proxyHomeSocketByOnApi.unreadTotals.index(limit)
    )
    // 首页消息未读通知
    socket.on(apiName[7], (totals: SocketEventsByOnArgs['unreadTotalsInform']) =>
        proxyHomeSocketByOnApi.unreadTotals.inform(totals)
    )
    // 私聊消息聊天界面
    socket.on(
        apiName[2],
        (data: SocketEventsByOnArgs['privateMessage']) =>
            proxyRoomMessageSocketByOnApi.private.msg[data.name] &&
            proxyRoomMessageSocketByOnApi.private.msg[data.name](data.data)
    )
    // 私聊消息聊天界面输入状态
    socket.on(
        apiName[3],
        (data: SocketEventsByOnArgs['privateMessageStateInput']) =>
            proxyRoomMessageSocketByOnApi.private.state.input[data.name] &&
            proxyRoomMessageSocketByOnApi.private.state.input[data.name](data)
    )
    // 群聊消息聊天界面
    socket.on(
        apiName[4],
        (data: SocketEventsByOnArgs['groupsMessage']) =>
            proxyRoomMessageSocketByOnApi.groups.msg[data.name] &&
            proxyRoomMessageSocketByOnApi.groups.msg[data.name](data.data)
    )
    // 群聊消息聊天界面禁言状态
    socket.on(
        apiName[5],
        (data: SocketEventsByOnArgs['groupsMessageBanState']) =>
            proxyRoomMessageSocketByOnApi.groups.state.ban[data.name] &&
            proxyRoomMessageSocketByOnApi.groups.state.ban[data.name](data)
    )
    // 首页好友列表
    socket.on(apiName[6], (list: SocketEventsByOnArgs['homeFriendsList']) => proxyHomeSocketByOnApi.friendsList(list))
    // 首页群聊列表
    socket.on(apiName[9], (list: SocketEventsByOnArgs['homeGroupchatList']) =>
        proxyHomeSocketByOnApi.groupchatList(list)
    )
    // 首页朋友圈列表
    socket.on(apiName[8], (list: SocketEventsByOnArgs['friendsCircleList']) =>
        proxyFriendsCircleSocketByOnApi.friendsCircleList(list)
    )
}
