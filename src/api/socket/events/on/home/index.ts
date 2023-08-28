import type { HomeSocketByOnApi } from './interface'

/** 首页Socket On Api */
export const proxyHomeSocketByOnApi: HomeSocketByOnApi = {
    unreadTotals: {
        index: (limit) => {},
        inform: (totals) => {}
    },
    message: (list) => {},
    friendsList: (list) => {},
    groupchatList: (list) => {}
}
