import type { ReactNode } from 'react'

/** 计时的展示格式 */
export type CountDownShowFormatter = {
    mins: number
    seconds: number
}
export type CountDownType = {
    /** 除持续时间外，要显示的初始文字 */
    text: string
    /** 正在进行前置校验时，显示的文字 */
    tip?: string
    /** 计时结束后，要显示的文字 */
    endText?: string
    /** 持续时间 */
    dur: number
    /** 格式化显示持续时间 */
    formatter?: (time: string) => ReactNode
    /** 距离最后多少秒时，改变文字颜色 */
    almostEndSeconds?: number
    /** 马上开始计时时触发。若该函数返回true，则代表开始计时，否则不开始计时 */
    willStartCounting?: () => void | boolean | Promise<boolean | void>
    /** 在持续时间内单击时触发 */
    durClick?: () => void
}
