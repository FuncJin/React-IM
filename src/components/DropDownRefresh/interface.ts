import type { ReactNode, MouseEvent } from 'react'

export type MouseEventAction<T = Promise<void>> = (ev: MouseEvent) => T

/**
 * - init:初始化
 * - passedDistance:已经超过下拉刷新的距离，但并未松开
 * - loading:正在刷新
 * - succeed: 超过下拉刷新的距离，且已松开
 */
export type StopTypes = 'init' | 'passedDistance' | 'loading' | 'succeed'

export type RefreshType = {
    /** 下拉刷新的进度 */
    plan: {
        init: ReactNode
        passedDistance: ReactNode
        loading: ReactNode
        succeed: ReactNode
    }
    /** 下拉的距离 */
    lastDisance: number
    /** 已达到刷新的条件时调用 */
    successFunc: Function
    children: ReactNode
}
