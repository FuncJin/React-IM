import { getIsEqualByRelationsHttpApi } from '@api/http/url/get/friend/isEqualByRelations'

/**
 * 当前用户与某个用户id是否是好友关系
 * - 返回true的情况：双方(用户A与用户B)互为好友
 * - 返回false的情况：id为自身或非法id、双方关系为陌生人
 */
export const isFriendRelation = (id: string) =>
    new Promise<boolean>((r) =>
        getIsEqualByRelationsHttpApi(id)({
            succeed: { func: (relation) => r(Boolean(relation)) },
            failed: { func: () => r(false) }
        })
    )
