/** body */
export type RoomMessageHandleByBody = {
    getCurMsgId: () => number
    setCurMsgId: (o: number) => void
}
/** footer */
export type RoomMessageHandleByFooter = {
    getCurMsgStyleState: () => boolean
    setIsMsgStyle: (b: boolean) => void
}

/** 本条消息是否是自己发送 */
export type TextMsgSelfType = { isSelf: boolean }
