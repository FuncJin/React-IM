/** 用户未读通知的格式 */
export type HomeUnreadInform = {
    friends: {
        data: {
            friendsRequest?: number
        }
        totals: number
    }
    groupchat: {
        data: {
            groupchatRequest?: number
            quit?: number
            dissolve?: number
            changeAdmins?: number
            kick?: number
        }
        totals: number
    }
    intro: {
        data: {
            liked?: number
        }
        totals: number
    }
    friendsCircle: {
        data: {
            friendsCircleActionInform?: number
        }
        totals: number
    }
    totals: number
}
