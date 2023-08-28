import { routeRegister } from '@router/register'
import { storage } from '@utils/storage'
import { mapSuspense } from './utils/mapSuspense'

import type { CheckRouteUtils } from './interface'

/** 路由配置 */
export const routeConfigs: CheckRouteUtils = {
    authFunc: () => !!storage.get('react_im_token'),
    failedPage: '/login',
    routeConfigs: mapSuspense([
        // 首页
        ...routeRegister.home,
        // 主面板
        ...routeRegister.panel,
        // 通用
        ...routeRegister.commons,
        // 账号
        ...routeRegister.account,
        // 好友
        ...routeRegister.friends,
        // 群聊
        ...routeRegister.groupchat,
        // 朋友圈
        ...routeRegister.friendsCircle,
        // 通知
        ...routeRegister.inform,
        // 用户
        ...routeRegister.user,
        // 兜底路由
        routeRegister.notFound
    ])
}
