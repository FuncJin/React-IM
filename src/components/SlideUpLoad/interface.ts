import type { ReactNode } from 'react'

/** 上拉加载组件所传递出去的数据 */
export type ImperativeHandleType = {
    slideDesignatedSpot: (distance: number) => void
    /** 设置滚动条至底部 */
    slideBottom: () => void
}

export type SlideUpLoadType = {
    className: string
    /**
     * 上滑到顶部触发时，该函数会收到当前页码数。
     * 如果该函数返回了一个假(null、undefined等)值，则代表还有可上滑的空间，
     * 若返回了一个真(string、ReactNode等)值，则代表没有上滑的空间了，
     * 此时会渲染这个为真的值，并且会停用滚动条监听事件(因为已经没有新数据了，所以没有必要反复去触发)
     */
    slipFinish: (pageSize: number) => Promise<ReactNode>
    children: ReactNode
}
