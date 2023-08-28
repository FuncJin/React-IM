import type { ReactNode } from 'react'

import type { HeaderType } from '@pages/Room/Layout/Header/interface'
import type { AccountType } from '@api/http/url/interface/account'

/** 子组件Ref */
export type ImperativeMessageHandleType = {
    /** 当上滑到顶部加载时触发 */
    pageSize: (page: number) => Promise<ReactNode>
}

// 传给Chat的内容
export type RoomBodyContent = {
    /** 设置头部 */
    setHeader: (header: HeaderType) => void
    /** 消息挂载后设置滚动条位置 */
    setScrollPosition: () => void
    /** 是否允许发送消息 */
    setAllow: (reason: string) => void
    /** 向父组件传递数据 */
    ref: any
}

/** Body Props */
export type Body = {
    ref: any
    idType: AccountType
    props: {
        oid: string
        setHeader: RoomBodyContent['setHeader']
        setAllow: RoomBodyContent['setAllow']
    }
}
