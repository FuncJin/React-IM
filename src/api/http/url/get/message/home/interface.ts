/** 首页展示的消息格式 */
type Msg = {
    id: string
    avatar: string
    unickname: string
    msg: string
    del?: string
    time: number
    totals: number
}

/** 群聊消息 */
type GroupMsg = Msg & {
    type: 'groups'
    gnickname: string
}
/** 私聊消息 */
type PrivateMsg = Msg & {
    type: 'private'
}

export type HomeMessageSingle = GroupMsg | PrivateMsg

/** 首页消息列表格式 */
export type HomeMessageList = {
    msg: HomeMessageSingle[]
    totals: number
}
