import { Commons } from '@router/Pages'

import type { RouteConfig } from '@router/interface'

/** 兜底路由 */
export const notFound: RouteConfig = {
    path: '*',
    lazyElement: <Commons.NotFound />
}
