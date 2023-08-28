import type { UserBasisInfo } from '@api/http/url/interface/user'

/** 所合并的基础信息 */
type BasisInfo = {
    age: UserBasisInfo['age']
    sex: UserBasisInfo['sex']
    birthplace: UserBasisInfo['birthplace']
}

/** 合并用户的基础信息 */
export const showUserBasisInfo = (info: BasisInfo) => {
    const {
        age,
        sex,
        birthplace: { province, city }
    } = info
    const result: (string | number)[] = []
    const conditions = [
        [sex, () => sex],
        [age, () => `${age}岁`],
        [province, () => `来自${province}${city}`]
    ] as const
    conditions.forEach(([c, f]) => (c ? result.push(f()) : false))
    return result.join(' ')
}
