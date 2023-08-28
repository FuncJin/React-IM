import { FriendsCircle, Inform } from '@router/Pages'

import { checkIdType } from '@router/auth'

import type { RouteConfig } from '@router/interface'

/** 与朋友圈相关的路由 */
export const friendsCircle: RouteConfig[] = [
    {
        path: '/friendsCircle/more',
        isAuth: true,
        lazyElement: <FriendsCircle.More />,
        children: [
            {
                path: '/friendsCircle/more/create',
                isAuth: true,
                lazyElement: <FriendsCircle.CreateContent />
            },
            {
                path: '/friendsCircle/more/inform',
                isAuth: true,
                lazyElement: <Inform.FriendsCircle />
            }
        ]
    },
    {
        path: '/friendsCircle/:id',
        pathReg: /^\/friendsCircle\/\d{4,6}$/,
        isAuth: true,
        onRoutePrivate: {
            before: { func: () => checkIdType({ id: window.location.pathname.split('/')[2], type: ['uid'] }) }
        },
        lazyElement: <FriendsCircle.Single.Page />,
        children: [
            {
                path: '/friendsCircle/:id/more',
                pathReg: /^\/friendsCircle\/\d{4,6}\/more$/,
                onRoutePrivate: {
                    before: { func: () => checkIdType({ id: window.location.pathname.split('/')[2], type: ['uid'] }) }
                },
                isAuth: true,
                lazyElement: <FriendsCircle.Single.More />,
                children: [
                    {
                        path: '/friendsCircle/:id/more/visitors',
                        pathReg: /^\/friendsCircle\/\d{4,6}\/more\/visitors$/,
                        onRoutePrivate: {
                            before: {
                                func: () => checkIdType({ id: window.location.pathname.split('/')[2], type: ['uid'] })
                            }
                        },
                        isAuth: true,
                        lazyElement: <FriendsCircle.Visitors />
                    },
                    {
                        path: '/friendsCircle/:id/more/background',
                        pathReg: /^\/friendsCircle\/\d{4,6}\/more\/background$/,
                        onRoutePrivate: {
                            before: {
                                func: () => checkIdType({ id: window.location.pathname.split('/')[2], type: ['uid'] })
                            }
                        },
                        isAuth: true,
                        lazyElement: <FriendsCircle.Background />
                    }
                ]
            }
        ]
    }
]
