import type { FriendAccountRelations } from '@api/http/url/interface/relations'
import type { IntroUserFriend } from '@api/http/url/get/intro/friend/interface'

/** 用户主页的数据信息 */
export type UserBasisInfo = {
    info: IntroUserFriend
    type: FriendAccountRelations
}
