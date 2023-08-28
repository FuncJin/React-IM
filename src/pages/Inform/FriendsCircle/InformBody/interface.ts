import type { FriendsCircleInformFormat } from '@api/http/url/get/inform/friendsCircle/body/interface'

export type InformBodyType = {
    /** 每条通知 */
    row: FriendsCircleInformFormat
    /** 通知的动作 */
    informText: string
}
