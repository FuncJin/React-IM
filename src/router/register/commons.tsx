import { Commons, Account, FriendsCircle, User, Inform } from '@router/Pages'

import { checkIdType } from '@router/auth'

import type { RouteConfig } from '@router/interface'

/** 通用路由 */
export const commons: RouteConfig[] = [
    {
        path: '/search',
        isAuth: true,
        lazyElement: <Commons.Search />
    },
    {
        path: '/shareHomePage/:id',
        pathReg: /^\/shareHomePage\/\d{4,6}$/,
        isAuth: true,
        onRoutePrivate: {
            before: { func: () => checkIdType({ id: window.location.pathname.split('/')[2], type: ['uid', 'gid'] }) }
        },
        lazyElement: <Commons.ShareHomePage />
    },
    {
        path: '/settings',
        isAuth: true,
        lazyElement: <Commons.MySettings />,
        children: [
            {
                path: '/settings/feedback',
                isAuth: true,
                lazyElement: <Commons.AppSoftware.Feedback />
            },
            {
                path: '/settings/versions',
                isAuth: true,
                lazyElement: <Commons.AppSoftware.Versions />
            },
            {
                path: '/settings/homePageTagDetails',
                isAuth: true,
                lazyElement: <Commons.AppSoftware.HomePageTagDetails />
            },
            {
                path: '/settings/retrievePwd',
                isAuth: true,
                lazyElement: <Account.RetrievePwd />
            },
            {
                path: '/settings/changePwd',
                isAuth: true,
                lazyElement: <Account.ChangePwd />
            },
            {
                path: '/settings/role',
                isAuth: true,
                lazyElement: <FriendsCircle.Role />
            },
            {
                path: '/settings/sectionTime',
                isAuth: true,
                lazyElement: <FriendsCircle.SectionTime />
            },
            {
                path: '/settings/logout',
                isAuth: true,
                lazyElement: <Account.Logout />
            },
            {
                path: '/settings/quitLogin',
                isAuth: true,
                lazyElement: <Account.QuitLogin />
            },
            {
                path: '/settings/rankDetails',
                isAuth: true,
                lazyElement: <Commons.RankDetails />
            },
            {
                path: '/settings/style',
                isAuth: true,
                lazyElement: <Commons.Style.Classify />,
                children: [
                    {
                        path: '/settings/style/background',
                        isAuth: true,
                        lazyElement: <Commons.Style.Background />
                    },
                    {
                        path: '/settings/style/colors',
                        isAuth: true,
                        lazyElement: <Commons.Style.Colors />
                    },
                    {
                        path: '/settings/style/confetti',
                        isAuth: true,
                        lazyElement: <Commons.Style.Confetti />
                    },
                    {
                        path: '/settings/style/customPanelSize',
                        isAuth: true,
                        lazyElement: <Commons.Style.CustomPanelSize />
                    },
                    {
                        path: '/settings/style/coloursText',
                        isAuth: true,
                        lazyElement: <Commons.Style.ColoursText />
                    }
                ]
            },
            {
                path: '/settings/systemInform',
                isAuth: true,
                lazyElement: <Inform.System />,
                children: [
                    {
                        path: '/settings/systemInform/message',
                        isAuth: true,
                        lazyElement: <Inform.SystemMessage />
                    },
                    {
                        path: '/settings/systemInform/unReadMessageRemind',
                        isAuth: true,
                        lazyElement: <Inform.UnReadMessageRemind />
                    }
                ]
            },
            {
                path: '/settings/lifeState',
                isAuth: true,
                lazyElement: <User.LifeState />
            },
            {
                path: '/settings/delMsgCopywriting',
                isAuth: true,
                lazyElement: <User.DelMsgCopywriting />
            },
            {
                path: '/settings/patted',
                isAuth: true,
                lazyElement: <User.Patted />
            },
            {
                path: '/settings/privateMsgInputState',
                isAuth: true,
                lazyElement: <User.PrivateMsgInputState />
            }
        ]
    },
    {
        path: '/intro/:id',
        pathReg: /^\/intro\/\d{4,6}$/,
        isAuth: true,
        lazyElement: <Commons.Intro />
    }
]
