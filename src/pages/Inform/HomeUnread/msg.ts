import type { HomeUnreadInform } from '@api/http/url/get/inform/unread/inform/interface'

export const defaultInform: HomeUnreadInform = {
    friends: {
        data: {
            friendsRequest: 0
        },
        totals: 0
    },
    groupchat: {
        data: {
            groupchatRequest: 0,
            quit: 0,
            dissolve: 0,
            changeAdmins: 0,
            kick: 0
        },
        totals: 0
    },
    intro: {
        data: {
            liked: 0
        },
        totals: 0
    },
    friendsCircle: {
        data: {
            friendsCircleActionInform: 0
        },
        totals: 0
    },
    totals: 0
}
