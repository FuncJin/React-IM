import type { EveryAccountBasisInfo } from './account'

/** 用户基本信息 */
export type UserBasisInfo = EveryAccountBasisInfo & {
    age: number
    sex: '男' | '女'
    birthplace: {
        province: string
        city: string
    }
    signature: string
}
