import { getIsJoinGroupchatHttpApi } from '@api/http/url/get/groupchat/isJoin'

/**
 * 当前用户是否已加入某个群聊
 * - 返回true的情况：当前用户加入了该群聊
 * - 返回false的情况：当前用户未加入该群聊
 */
export const isJoinGroupchat = (id: string) =>
    new Promise<boolean>((r) =>
        getIsJoinGroupchatHttpApi(id)({
            succeed: { func: (relation) => r(!!relation) },
            failed: { func: () => r(false) }
        })
    )
