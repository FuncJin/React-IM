import { Suspense } from 'react'

import type { RouteConfig } from '@router/interface'

/** 映射React.lazy所需的Suspense组件 */
export const mapSuspense = (route: RouteConfig[]): any => {
    for (let i = 0, len = route.length; i < len; i++) {
        const rot = route[i]
        if (rot.element === null) continue
        // 将element与lazyElement整合为element
        rot.element = rot.element ? rot.element : <Suspense>{rot.lazyElement}</Suspense>
        // 当rot.lazyElement存在时，将其删除
        if (rot.lazyElement) delete rot.lazyElement
        // 处理子路由的lazyElement
        if (rot.children) mapSuspense(rot.children)
    }
    return route
}
