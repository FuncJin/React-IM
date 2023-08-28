import { lazy } from 'react'

/** 通知相关 */
export const Inform = {
    HomeUnread: lazy(() => import('@pages/Inform/HomeUnread')),
    Classify: lazy(() => import('@pages/Inform/Classify')),
    FriendsRequest: lazy(() => import('@pages/Inform/FriendsRequest')),
    Liked: lazy(() => import('@pages/Inform/liked')),
    FriendsCircle: lazy(() => import('@pages/Inform/FriendsCircle')),
    System: lazy(() => import('@pages/Inform/System')),
    SystemMessage: lazy(() => import('@pages/Inform/SystemMessage')),
    UnReadMessageRemind: lazy(() => import('@pages/Inform/UnReadMessageRemind')),
    Groupchat: {
        ChangeAdmin: lazy(() => import('@pages/Inform/Groupchat/ChangeAdmin')),
        Request: lazy(() => import('@pages/Inform/Groupchat/Request')),
        Kick: lazy(() => import('@pages/Inform/Groupchat/Kick')),
        Quit: lazy(() => import('@pages/Inform/Groupchat/Quit')),
        Dissolve: lazy(() => import('@pages/Inform/Groupchat/Dissolve'))
    }
}
