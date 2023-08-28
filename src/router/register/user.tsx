import { User } from '@router/Pages'

import type { RouteConfig } from '@router/interface'

/** 与用户相关的路由 */
export const user: RouteConfig[] = [
    {
        path: '/setSelfInfo',
        isAuth: true,
        lazyElement: <User.SetInfo />
    }
]
