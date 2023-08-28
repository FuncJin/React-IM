import { lazy } from 'react'

/** 群聊相关 */
export const Groupchat = {
    Create: lazy(() => import('@pages/Groupchat/Create')),
    Add: lazy(() => import('@pages/Groupchat/Add')),
    Dissolve: lazy(() => import('@pages/Groupchat/Dissolve')),
    Quit: lazy(() => import('@pages/Groupchat/Quit')),
    MemberList: lazy(() => import('@pages/Groupchat/MemberList')),
    ShowActionByRelations: lazy(() => import('@pages/Groupchat/ShowActionByRelations')),
    Ban: lazy(() => import('@pages/Groupchat/Ban')),
    Host: lazy(() => import('@pages/Groupchat/Host')),
    Admins: lazy(() => import('@pages/Groupchat/Admins')),
    Commons: lazy(() => import('@pages/Groupchat/Commons')),
    Stranger: lazy(() => import('@pages/Groupchat/Stranger')),
    SetInfo: lazy(() => import('@pages/Groupchat/SetInfo'))
}
