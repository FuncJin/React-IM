/** 每个等级值的类型 */
export const rankValueType = {
    addFriendsCircleContent: '发布朋友圈说说',
    addFriendsCircleComment: '评论或回复说说',
    addGroupchat: '创建群聊',
    sendPrivate: '发送私聊消息',
    sendGroup: '发送群聊消息'
}

export type RankValueTypeKey = keyof typeof rankValueType
