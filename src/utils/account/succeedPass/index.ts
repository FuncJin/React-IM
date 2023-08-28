import { storage } from '@utils/storage'
import { domMethods } from '@utils/dom'

import type { Account } from './interface'

/** 登录或注册成功时所能够做的一些任务 */
export const succeedPass = (acc: Account) => {
    // 将token存储在localStorage中
    storage.set('react_im_token', acc.token)
    // 记录该账号的一些信息
    storage.set('react_im_user_id', acc.id)
    storage.set('react_im_user_nickname', acc.nickname)
    storage.set('react_im_user_avatar', acc.avatar)
    storage.set('react_im_pc_home_background', acc.background)
    // 登录或注册成功后，修改pc端主页背景图片
    domMethods.changeBodyBackground(acc.background)
}
