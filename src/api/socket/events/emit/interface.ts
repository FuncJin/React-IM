type PrivateMessageInputState = {
    self: string
    other: string
    /** 输入状态是否已结束 */
    isEnd: boolean
}

/** Socket Emit Api */
export type SocketEventsByEmitApi = {
    private: {
        state: {
            input: (data: PrivateMessageInputState) => void
        }
    }
}
