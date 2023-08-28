import { lazy } from 'react'

/** 通用 */
export const Commons = {
    Search: lazy(() => import('@pages/Commons/Search')),
    Intro: lazy(() => import('@pages/Commons/Intro')),
    ShareHomePage: lazy(() => import('@pages/Commons/ShareHomePage')),
    AppSoftware: {
        Feedback: lazy(() => import('@pages/Commons/AppSoftware/Feedback')),
        Versions: lazy(() => import('@pages/Commons/AppSoftware/Versions')),
        HomePageTagDetails: lazy(() => import('@pages/Commons/AppSoftware/HomePageTagDetails'))
    },
    RankDetails: lazy(() => import('@pages/Commons/RankDetails')),
    Style: {
        Classify: lazy(() => import('@pages/Commons/Style/Classify')),
        Background: lazy(() => import('@pages/Commons/Style/Background')),
        Colors: lazy(() => import('@pages/Commons/Style/Colors')),
        Confetti: lazy(() => import('@pages/Commons/Style/Confetti')),
        CustomPanelSize: lazy(() => import('@pages/Commons/Style/CustomPanelSize')),
        ColoursText: lazy(() => import('@pages/Commons/Style/ColoursText'))
    },
    MySettings: lazy(() => import('@pages/Commons/MySettings')),
    NotFound: lazy(() => import('@pages/Commons/NotFound'))
}
