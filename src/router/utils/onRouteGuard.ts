import type { OnRoutePublicConfig, CheckRouteUtils, RouteConfig } from '@router/interface'

type GuardArgs = {
    /** 全局守卫 */
    _public?: CheckRouteUtils['onRoutePublic']
    /** 私有守卫 */
    _private?: RouteConfig['onRoutePrivate']
    /** 全局守卫配置项 */
    onRoutePublicConfig?: OnRoutePublicConfig
    /** 守卫类型 */
    type: keyof OnRoutePublicConfig
}
/** 全局路由守卫 */
type OnRouteGuardAfter = (guardArgs: GuardArgs) => Promise<boolean | void>

/** 进行路由守卫（全局与私有、前置与后置） */
export const onRouteGuard: OnRouteGuardAfter = async ({ _public, _private, onRoutePublicConfig, type }) => {
    const _onRoutePublic = async () => {
        const __public = _public || { before: () => true, after: () => true }
        // 当前路由是否需要进行全局路由守卫
        // 只有开启了相应的路由配置项才会去执行对应的守卫函数！
        if (!(onRoutePublicConfig && onRoutePublicConfig[type])) return true
        // 是否存在全局路由守卫函数
        if (!__public[type]) return true
        return __public[type] ? await __public[type]!() : true
    }
    const _onRoutePrivate = async (func: Function) => await func()
    // 是否存在私有路由守卫
    if (_private) {
        const _c = { func: () => true, isFrist: false }
        const __private = _private || { before: _c, after: _c }
        const isConfig = __private[type]
        if (!isConfig) return true
        const { func, isFrist } = isConfig
        // 私有路由守卫 > 全局路由守卫
        if (isFrist) return (await _onRoutePrivate(func)) ? await _onRoutePublic() : false
        // 全局路由守卫 > 私有路由守卫
        return (await _onRoutePublic()) ? await _onRoutePrivate(func) : false
    }
    // 执行全局路由守卫
    return await _onRoutePublic()
}
