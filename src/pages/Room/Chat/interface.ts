export type SetCurMsgId = (id: number) => void

/** 消息弹出层 */
type PopUpMenu = {
    curMsgId: number
    setCurMsgId: SetCurMsgId
}

/** 渲染单条消息 */
export type RenderSingleMsg<T> = T & PopUpMenu & { idx: number }

// 私聊、群聊这两个UI组件可以收到的参数
export type ChatChildrenType<T = any> = PopUpMenu & {
    id: string
    historyMessage: T
}
