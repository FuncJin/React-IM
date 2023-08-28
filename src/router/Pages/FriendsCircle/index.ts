import { lazy } from 'react'

/** 朋友圈相关 */
export const FriendsCircle = {
    CreateContent: lazy(() => import('@pages/FriendsCircle/CreateContent')),
    More: lazy(() => import('@pages/FriendsCircle/More')),
    Role: lazy(() => import('@pages/FriendsCircle/Role')),
    SectionTime: lazy(() => import('@pages/FriendsCircle/SectionTime')),
    Visitors: lazy(() => import('@pages/FriendsCircle/Visitors')),
    Background: lazy(() => import('@pages/FriendsCircle/Background')),
    Single: {
        Page: lazy(() => import('@pages/FriendsCircleSingle/Single')),
        More: lazy(() => import('@pages/FriendsCircleSingle/More'))
    }
}
