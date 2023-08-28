import Index from '@pages/Index'

import type { RouteConfig } from '@router/interface'

/** 与主页相关的路由 */
export const home: RouteConfig[] = [
    {
        path: '/',
        element: <Index />
    },
    {
        path: '/index',
        element: <Index />
    }
]
