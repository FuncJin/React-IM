import type { UserSubscribeRequest } from '@api/http/url/get/request/friend/interface'

/** 更新好友申请的函数 */
type UpdateRequest = () => Promise<void>

/** 收到的通知的类型Props */
export type SubType = {
    updateRequest: UpdateRequest
    subscribe: UserSubscribeRequest[]
}
/** 等待验证状态 */
export type WaittingType = {
    oid: string
    oname: string
    updateRequest: UpdateRequest
}
