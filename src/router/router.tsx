import { useState, useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'

import { findCurRoute } from './utils/findCurRoute'
import { onRouteGuard } from './utils/onRouteGuard'

import type { FC } from 'react'

import type { RouteConfig, CheckRouteUtils } from './interface'

/** 路由守卫 */
const RoutesGuard: FC<CheckRouteUtils> = ({ routeConfigs, authFunc, onRoutePublic, failedPage }) => {
    const [isMount, setIsMount] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const router = useRoutes(routeConfigs as RouteConfig[])
    useEffect(() => {
        /** 存储当前路由所对应的配置项 */
        const curRoute = findCurRoute(routeConfigs, location.pathname)
        const check = async () => {
            /**
             * 如果当前路径未注册(此处的未注册路由指的是动态路由，静态路由在*的兜底情况之中)，
             * 所以当路径未注册时，跳转至404组件(自动向上返回一级)
             */
            if (!curRoute) return navigate(-1)
            // curRoute存在时表示当前路由为已注册路由，若不存在，则自动跳转至404组件(自动向上返回一级)
            /** 是否符合通过了前置路由守卫 */
            const isBeforeOk = await onRouteGuard({
                _public: onRoutePublic,
                _private: curRoute.onRoutePrivate,
                onRoutePublicConfig: curRoute.onRoutePublicConfig,
                type: 'before'
            })
            if (!isBeforeOk) {
                navigate(-1)
                setIsMount(true)
                return
            }
            // 是否需要进行鉴权
            if (!curRoute.isAuth) return setIsMount(true)
            const checkAuth = async () => {
                // 执行全局鉴权函数
                if (!authFunc) return true
                return await authFunc()
            }
            const isAuthOk = await checkAuth()
            if (!isAuthOk) {
                navigate(failedPage)
                setIsMount(true)
                return
            }
            const isAfterOk = await onRouteGuard({
                _public: onRoutePublic,
                _private: curRoute.onRoutePrivate,
                onRoutePublicConfig: curRoute.onRoutePublicConfig,
                type: 'after'
            })
            if (!isAfterOk) {
                navigate(-1)
                setIsMount(true)
                return
            }
            setIsMount(true)
        }
        check()
    }, [location.pathname]) // 页面路由改变
    return isMount ? router : null
}

export default RoutesGuard
