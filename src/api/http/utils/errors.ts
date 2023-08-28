import { message } from '@components/Message'

import { storage } from '@utils/storage'
import { apiStateDetailsKey } from './apiStateDetailsKey'

import type { CustomValueByStringObject } from '@interface/type'
import type { InstanceResponse } from '@api/http/interface/instance'

type HandleApiCodeErrorsFunc = (msg?: string) => void
type CheckErrorsCode = [(code: number) => boolean, HandleApiCodeErrorsFunc]
type HandleApiErrors = CustomValueByStringObject<HandleApiCodeErrorsFunc>

/** 处理各自请求错误的方法 */
const handleApiErrors: HandleApiErrors = {
    /** 状态码为20000，代表token失效 */
    '20000': () => {
        // 清除一些本地缓存
        storage.remove('react_im_token')
        storage.remove('react_im_illegal_topic_flag_0')
        storage.remove('react_im_custom_panel_size')
        storage.remove('react_im_unread_totals')
        // 如果是注册请求，则不变化
        if (window.location.pathname === '/register') return
        // token过期或token不合法时，跳转到登录页
        if (window.location.pathname !== '/login') window.location.href = '/login'
    },
    /** 状态码为30000，代表服务不存在 */
    '30000': () => message({ title: '服务不可用', options: [{ text: '确定' }] }),
    /** 状态码处于42000-45999区间，代表本次请求出错 */
    '42000': () => message({ title: '请求出错', options: [{ text: '确定' }] }),
    /** 状态码为50000时，代表当前api曾或当前正处于变动期间 */
    '50000': (msg) =>
        message({
            title: `该功能${apiStateDetailsKey[msg as keyof typeof apiStateDetailsKey]}`,
            options: [{ text: '确定' }]
        })
}
/** 能够处理的请求失败情况 */
const _errorsCode: CheckErrorsCode[] = [
    [(code) => code === 20000, handleApiErrors['20000']],
    [(code) => code === 30000, handleApiErrors['30000']],
    [(code) => code >= 42000 && code <= 45999, handleApiErrors['42000']],
    [(code) => code >= 50000 && code <= 59999, handleApiErrors['50000']]
]

/** 处理请求失败 */
export const handleApiCodeErrors = (code: number, msg: string) => {
    const data = _errorsCode.find(([e]) => e(code))
    // 如果能够处理本次错误
    if (data) data[1](msg)
    // 此处直接返回成功的Promise对象
    const _data: InstanceResponse = { type: 'error', data: msg }
    return _data
}
