import { getIsJoinAllGroupchatHttpApi } from '@api/http/url/get/groupchat/isJoinAll'

import type { MapId } from '@interface/type'

/**
 * 指定用户是否加入了指定群聊
 * - 返回true的情况：指定用户加入了该群聊
 * - 返回false的情况：指定用户未加入该群聊
 */
export const isJoinGroupchatByAssignUser = (id: MapId<'oid' | 'gid'>) =>
    new Promise<boolean>((r) =>
        getIsJoinAllGroupchatHttpApi(id)({
            succeed: { func: (relation) => r(!!relation) },
            failed: { func: () => r(false) }
        })
    )
