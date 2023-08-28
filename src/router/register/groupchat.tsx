import { Groupchat } from '@router/Pages'

import { storage } from '@utils/storage'
import {
    isJoinGroupchat,
    isHostByGroupchat,
    isAdminByGroupchat,
    isCommonByGroupchat,
    isJoinGroupchatByAssignUser,
    isTrueByGroupchatRoleGrade,
    checkIdType
} from '@router/auth'

import type { RouteConfig } from '@router/interface'

const uid = storage.get('react_im_user_id')

/** 与群聊相关的路由 */
export const groupchat: RouteConfig[] = [
    {
        path: '/groupchat/create',
        isAuth: true,
        lazyElement: <Groupchat.Create />
    },
    {
        path: '/groupchat/add/:id',
        pathReg: /^\/groupchat\/add\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Add />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && !(await isJoinGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/memberList/:id',
        pathReg: /^\/groupchat\/memberList\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.MemberList />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && (await isJoinGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/memberList/:id/:id',
        pathReg: /^\/groupchat\/memberList\/\d{4,6}\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.ShowActionByRelations />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const [, , , gid, oid] = window.location.pathname.split('/')
                    const isPre =
                        (await checkIdType({ id: gid, type: ['gid'] })) &&
                        (await checkIdType({ id: oid, type: ['uid'] }))
                    if (!isPre) return false
                    const isGid = await isJoinGroupchat(gid)
                    const isJoin = await isJoinGroupchatByAssignUser({ gid, oid })
                    return isGid && isJoin
                }
            }
        }
    },
    {
        path: '/groupchat/memberList/:id/:id/ban',
        pathReg: /^\/groupchat\/memberList\/\d{4,6}\/\d{4,6}\/ban$/,
        isAuth: true,
        lazyElement: <Groupchat.Ban />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const [, , , gid, oid] = window.location.pathname.split('/')
                    const isPre =
                        (await checkIdType({ id: gid, type: ['gid'] })) &&
                        (await checkIdType({ id: oid, type: ['uid'] }))
                    if (!isPre) return false
                    if (!(await isJoinGroupchat(gid))) return false
                    if (!(await isJoinGroupchatByAssignUser({ gid, oid }))) return false
                    return await isTrueByGroupchatRoleGrade({ uid, oid, gid })
                }
            }
        }
    },
    {
        path: '/groupchat/host/:id',
        pathReg: /^\/groupchat\/host\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Host />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && (await isHostByGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/admins/:id',
        pathReg: /^\/groupchat\/admins\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Admins />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && (await isAdminByGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/commons/:id',
        pathReg: /^\/groupchat\/commons\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Commons />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && (await isCommonByGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/stranger/:id',
        pathReg: /^\/groupchat\/stranger\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Stranger />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && !(await isJoinGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/setInfo/:id',
        pathReg: /^\/groupchat\/setInfo\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.SetInfo />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && (await isHostByGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/dissolve/:id',
        pathReg: /^\/groupchat\/dissolve\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Dissolve />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    return (await checkIdType({ id, type: ['gid'] })) && (await isHostByGroupchat(id))
                }
            }
        }
    },
    {
        path: '/groupchat/quit/:id',
        pathReg: /^\/groupchat\/quit\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Groupchat.Quit />,
        onRoutePrivate: {
            before: {
                func: async () => {
                    const id = window.location.pathname.split('/')[3]
                    if (!(await checkIdType({ id, type: ['gid'] }))) return false
                    const isJoin = await isJoinGroupchat(id)
                    const isHost = await isHostByGroupchat(id)
                    return !isHost && isJoin
                }
            }
        }
    }
]
