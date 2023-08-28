import type { FC, ReactNode } from 'react'

/** Header与Tab的Props */
export type PanelContent<T = {}> = FC<T & { isContentShow: boolean }>
export type PanelType = { children: ReactNode }

/** Panel面板上的页面(Message、Contacts、FriendsCircle页面) */
export type PanelBodyPageType = FC<{
    className?: string
    ref: any
}>
