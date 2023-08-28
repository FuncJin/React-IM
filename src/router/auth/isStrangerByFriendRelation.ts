import { getFriendRelationsHttpApi } from '@api/http/url/get/friend/relations'

/**
 * 当前用户与某个用户id是否是陌生关系
 * - 返回true的情况：双方(用户A与用户B)互为陌生人
 * - 返回false的情况：id为自身或非法id、双方关系为好友
 */
export const isStrangerByFriendRelation = (id: string) =>
    new Promise<boolean>((r) =>
        getFriendRelationsHttpApi(id)({
            succeed: { func: (relation) => r(!relation) },
            failed: { func: () => r(false) }
        })
    )
