import { Account } from '@router/Pages'

import type { RouteConfig } from '@router/interface'

/** 与账号相关的路由 */
export const account: RouteConfig[] = [
    {
        path: '/login',
        lazyElement: <Account.Login />
    },
    {
        path: '/register',
        lazyElement: <Account.Register />
    },
    {
        path: '/retrievePwd',
        lazyElement: <Account.RetrievePwd />
    }
]
