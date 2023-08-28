import { storage } from '@utils/storage'
import { changeH5PageTitle } from './changeH5PageTitle'

import { websocket } from '@api/socket/connect'

const pageVisibilityState = {
    /** 当前页面是否被隐藏 */
    isHidden: false,
    /** 在页面隐藏时改变H5标题 */
    changeH5PageTitleByHidden: () => {
        // 页面是否在隐藏状态
        if (!pageVisibilityState.isHidden) return
        // 页面被隐藏时，修改H5标题
        const totals = storage.get('react_im_unread_totals')
        // 如果没有未读消息数
        if (!totals) return
        changeH5PageTitle(`React IM 您有${totals}条新消息待处理`)
    }
}

/** 监听页面隐藏或显示 */
const bindPageVisibilityChangeEv = () => {
    document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState
        // 页面是否被隐藏
        if (state === 'hidden') {
            pageVisibilityState.isHidden = true
            pageVisibilityState.changeH5PageTitleByHidden()
            return
        }
        // 页面显示时
        if (!pageVisibilityState.isHidden) return
        // 重连ws
        const pathname = window.location.pathname
        if (!['/', '/login', '/register'].includes(pathname)) websocket.connection(pathname)
        // 修改回原页面标题
        changeH5PageTitle('React 即时通讯')
    })
}

export const pageVisibility = {
    pageVisibilityState,
    bindPageVisibilityChangeEv
}
