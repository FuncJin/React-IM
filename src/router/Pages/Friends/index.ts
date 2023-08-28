import { lazy } from 'react'

/** 好友相关 */
export const Friends = {
    ManagementGroups: lazy(() => import('@pages/Friends/ManagementGroups')),
    Add: lazy(() => import('@pages/Friends/Add')),
    ChangeAlias: lazy(() => import('@pages/Friends/ChangeAlias')),
    ChangeGroups: lazy(() => import('@pages/Friends/ChangeGroups')),
    Delete: lazy(() => import('@pages/Friends/Delete')),
    MyFriends: lazy(() => import('@pages/Friends/MyFriends')),
    Stranger: lazy(() => import('@pages/Friends/Stranger'))
}
