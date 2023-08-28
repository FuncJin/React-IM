import type { rankValueType } from '@pages/Commons/RankDetails/rankType'

/** 单个等级值的详情 */
export type RankValueDetails = {
    value: number
    time: number
    type: keyof typeof rankValueType
}

/** 总的等级详情 */
export type RankDetails = {
    rank: number
    totals: number
    details: RankValueDetails[]
}
