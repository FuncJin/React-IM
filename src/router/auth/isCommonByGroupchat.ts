import { getGroupchatRoleAllHttpApi } from '@api/http/url/get/groupchat/roleAll'

/**
 * 当前用户是否是某个群聊的普通成员
 * - 返回true的情况：当前用户为该群普通成员
 * - 返回false的情况：当前用户不为该群普通成员
 */
export const isCommonByGroupchat = (id: string) =>
    new Promise<boolean>((r) =>
        getGroupchatRoleAllHttpApi(id)({
            succeed: { func: (role) => r(role === 'commons') },
            failed: { func: () => r(false) }
        })
    )
