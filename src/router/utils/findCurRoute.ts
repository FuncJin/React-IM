import type { RouteConfig } from '@router/interface'

/** 找出当前路径所对应的路由配置 */
export const findCurRoute = (routes: RouteConfig[], pathname: string): RouteConfig | undefined => {
    for (let i = 0, len = routes.length; i < len; i++) {
        const config = routes[i]
        // pathReg配置项的优先级 > path配置项
        if (config.pathReg) {
            if (config.pathReg.test(pathname)) return config
        } else {
            if (config.path === pathname) return config
        }
        // 当前路径与父级路径不相匹配，但同时当前路径又存在子路径的情况
        if (!config.children) continue
        const _cp = findCurRoute(config.children, pathname)
        // 如果是子级路由
        if (_cp) return _cp
    }
    // 没有可匹配的路由
}
