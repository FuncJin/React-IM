import type { SetCurMsgId } from '@pages/Room/Chat/interface'

export type MsgBarArgs<T> = {
    setCurMsgId: SetCurMsgId
    time: number
    isSelf: boolean
    data: T
}
