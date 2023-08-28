import { lazy } from 'react'

/** 用户相关 */
export const User = {
    LifeState: lazy(() => import('@pages/User/LifeState')),
    DelMsgCopywriting: lazy(() => import('@pages/User/DelMsgCopywriting')),
    Patted: lazy(() => import('@pages/User/Patted')),
    PrivateMsgInputState: lazy(() => import('@pages/User/PrivateMsgInputState')),
    SetInfo: lazy(() => import('@pages/User/SetInfo'))
}
