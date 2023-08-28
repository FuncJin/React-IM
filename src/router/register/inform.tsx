import { Inform } from '@router/Pages'

import type { RouteConfig } from '@router/interface'

/** 与通知相关的路由 */
export const inform: RouteConfig[] = [
    {
        path: '/inform/homeUnread',
        isAuth: true,
        lazyElement: <Inform.HomeUnread />
    },
    {
        path: '/inform',
        isAuth: true,
        lazyElement: <Inform.Classify />,
        children: [
            {
                path: '/inform/liked',
                isAuth: true,
                lazyElement: <Inform.Liked />
            },
            {
                path: '/inform/friendsCircle',
                isAuth: true,
                lazyElement: <Inform.FriendsCircle />
            },
            {
                path: '/inform/friendsCircleActionInform',
                isAuth: true,
                lazyElement: <Inform.FriendsCircle />
            },
            {
                path: '/inform/friendsRequest',
                isAuth: true,
                lazyElement: <Inform.FriendsRequest />
            },
            {
                path: '/inform/groupchatRequest',
                isAuth: true,
                lazyElement: <Inform.Groupchat.Request />
            },
            {
                path: '/inform/dissolve',
                isAuth: true,
                lazyElement: <Inform.Groupchat.Dissolve />
            },
            {
                path: '/inform/changeAdmins',
                isAuth: true,
                lazyElement: <Inform.Groupchat.ChangeAdmin />
            },
            {
                path: '/inform/kick',
                isAuth: true,
                lazyElement: <Inform.Groupchat.Kick />
            },
            {
                path: '/inform/quit',
                isAuth: true,
                lazyElement: <Inform.Groupchat.Quit />
            }
        ]
    }
]
