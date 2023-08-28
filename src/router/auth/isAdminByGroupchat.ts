import { getGroupchatRoleAllHttpApi } from '@api/http/url/get/groupchat/roleAll'

/**
 * 当前用户是否是某个群聊的管理员
 * - 返回true的情况：当前用户为该群管理员
 * - 返回false的情况：当前用户不为该群管理员
 */
export const isAdminByGroupchat = (id: string) =>
    new Promise<boolean>((r) =>
        getGroupchatRoleAllHttpApi(id)({
            succeed: { func: (role) => r(role === 'admins') },
            failed: { func: () => r(false) }
        })
    )
