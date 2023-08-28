import { Message } from '@router/Pages'

import type { RouteConfig } from '@router/interface'

/** 与主面板相关的路由 */
export const panel: RouteConfig[] = [
    {
        path: '/message',
        isAuth: true,
        element: null
    },
    {
        path: '/message/:id',
        pathReg: /^\/message\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Message.Room />
    },
    {
        path: '/contacts',
        isAuth: true,
        element: null
    },
    {
        path: '/friendsCircle',
        isAuth: true,
        element: null
    }
]
