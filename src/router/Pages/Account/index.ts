import { lazy } from 'react'

/** 账号相关 */
export const Account = {
    Login: lazy(() => import('@pages/Account/Login')),
    Register: lazy(() => import('@pages/Account/Register')),
    RetrievePwd: lazy(() => import('@pages/Account/RetrievePwd')),
    ChangePwd: lazy(() => import('@pages/Account/ChangePwd')),
    Logout: lazy(() => import('@pages/Account/Logout')),
    QuitLogin: lazy(() => import('@pages/Account/QuitLogin'))
}
