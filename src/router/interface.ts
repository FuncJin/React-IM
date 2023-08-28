import type { ReactNode } from 'react'

/** 路由鉴权回调函数(cb) */
type RouteAuthFunction = () => boolean | Promise<boolean>

/** 私有路由守卫 */
type OnRoutePrivate = {
    /** 要触发的路由守卫函数 */
    func: RouteAuthFunction
    /** 是否希望私有守卫在全局守卫前触发 */
    isFrist?: boolean
}

/** 每个路由配置项的公有路由守卫配置 */
export type OnRoutePublicConfig = {
    /** 是否要进行全局前置路由守卫 */
    before?: boolean
    /** 是否要进行全局后置路由守卫 */
    after?: boolean
}

/**
 * 单个路由配置项(注意，路由守卫性质分为私有与全局：)
 * - 私有即当前路由独自的路由守卫
 * - 全局即所有路由统一进行的路由守卫
 */
export type RouteConfig = {
    /** 路径 */
    path: string
    /**
     * 路径类正则。注意，
     *    - 如果指定了该项，则路由守卫(注意，不是react-router-dom)将按照pathReg来进行匹配，而不是按照path进行路由匹配。
     *
     *          (若在子路由中指定了该项，子路由的pathReg中的正则表达式必须是完整的路径(即父级->当前级))
     */
    pathReg?: RegExp
    /** 路由组件(普通) */
    element?: ReactNode
    /** 路由组件(懒加载) */
    lazyElement?: ReactNode
    /** 该路由是否需要进行鉴权 */
    isAuth?: boolean
    /** 子路由(需配合Outlet组件) */
    children?: RouteConfig[]
    /** 路由前置、后置守卫(全局) */
    onRoutePublicConfig?: OnRoutePublicConfig
    /** 路由前置、后置守卫(私有) */
    onRoutePrivate?: {
        before?: OnRoutePrivate
        after?: OnRoutePrivate
    }
}

export type CheckRouteUtils = {
    /** 路由配置表 */
    routeConfigs: RouteConfig[]
    /** 全局鉴权函数 */
    authFunc?: RouteAuthFunction
    /** 全局路由守卫函数 */
    onRoutePublic?: {
        before?: RouteAuthFunction
        after?: RouteAuthFunction
    }
    /**
     * 全局鉴权失败时，或路由守卫失败时要跳转到的页面
     *
     *   注意，无论是私有路由守卫函数还是全局路由守卫函数，只要返回了false，就都会跳转到该页面
     */
    failedPage: string
}
