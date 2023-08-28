import { getGroupchatRoleAllHttpApi } from '@api/http/url/get/groupchat/roleAll'

/**
 * 当前用户是否是某个群聊的群主
 * - 返回true的情况：当前用户为该群群主
 * - 返回false的情况：当前用户不为该群群主
 */
export const isHostByGroupchat = (id: string) =>
    new Promise<boolean>((r) =>
        getGroupchatRoleAllHttpApi(id)({
            succeed: { func: (role) => r(role === 'host') },
            failed: { func: () => r(false) }
        })
    )
