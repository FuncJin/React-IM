import { getIdTypeHttpApi } from '@api/http/url/account/type/id'

import type { AccountType } from '@api/http/url/interface/account'

type CheckIdType = {
    id: string
    type: AccountType[]
}

/** 判断某个id的类型是否是指定类型 */
export const checkIdType = ({ id, type }: CheckIdType) =>
    new Promise<boolean>((r) =>
        getIdTypeHttpApi(id)({
            succeed: { func: (t) => r(type.includes(t)) },
            failed: { func: () => r(false) }
        })
    )
