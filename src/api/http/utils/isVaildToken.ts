import { isVaildTokenHttpApi } from '@api/http/url/account/token'

/** 当前账号的token是否有效(合法) */
export const isVaildToken = () =>
    new Promise<boolean>((r) =>
        isVaildTokenHttpApi()({
            succeed: { func: () => r(true) },
            failed: { func: () => r(false) }
        })
    )
