import type { UserBasisInfo } from '@api/http/url/interface/user'
import type { CustomObject } from '@interface/type'

/** 好友关系 */
type Friend = {
    type: 'friend'
    /** 好友(双方是好友) */
    info: IntroUserFriend
}
/** 陌生人 */
type Stranger = {
    type: 'stranger'
    /** 陌生人(双方不是好友) */
    info: IntroUserStranger
}
/** 自己 */
type Self = {
    type: 'self'
    info: IntroUserFriend
}

/** 自己、好友、陌生人的公共返回信息 */
export type IntroUserFriend = UserBasisInfo & {
    avatar: string
    background: string
    homeLocation: string
    rank: number
    alias: string
    groupsName: string
    tags: CustomObject<string, string[]>
}
/** 陌生人(双方不是好友) */
export type IntroUserStranger = IntroUserFriend

export type IntroUser = Friend | Stranger | Self
