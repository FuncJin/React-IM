import { Friends } from '@router/Pages'

import { isFriendRelation, isStrangerByFriendRelation } from '@router/auth'

import type { RouteConfig } from '@router/interface'

/** 与好友相关的路由 */
export const friends: RouteConfig[] = [
    {
        path: '/friends/changeGroup/:id',
        pathReg: /^\/friends\/changeGroup\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Friends.ChangeGroups />,
        onRoutePrivate: { before: { func: () => isFriendRelation(window.location.pathname.split('/')[3]) } }
    },
    {
        path: '/friends/changeAlias/:id',
        pathReg: /^\/friends\/changeAlias\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Friends.ChangeAlias />,
        onRoutePrivate: { before: { func: () => isFriendRelation(window.location.pathname.split('/')[3]) } }
    },
    {
        path: '/friends/delete/:id',
        pathReg: /^\/friends\/delete\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Friends.Delete />,
        onRoutePrivate: { before: { func: () => isFriendRelation(window.location.pathname.split('/')[3]) } }
    },
    {
        path: '/friends/add/:id',
        pathReg: /^\/friends\/add\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Friends.Add />,
        onRoutePrivate: { before: { func: () => isStrangerByFriendRelation(window.location.pathname.split('/')[3]) } }
    },
    {
        path: '/friends/managementGroups',
        isAuth: true,
        lazyElement: <Friends.ManagementGroups />
    },
    {
        path: '/friends/:id',
        pathReg: /^\/friends\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Friends.MyFriends />,
        onRoutePrivate: { before: { func: () => isFriendRelation(window.location.pathname.split('/')[2]) } }
    },
    {
        path: '/friends/stranger/:id',
        pathReg: /^\/friends\/stranger\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Friends.Stranger />,
        onRoutePrivate: { before: { func: () => isStrangerByFriendRelation(window.location.pathname.split('/')[3]) } }
    }
]
