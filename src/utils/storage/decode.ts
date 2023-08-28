import type { CustomObject } from '@interface/type'
import type { LocalStorageType } from './interface/localStorageType'

type DecodeFunc = (key: LocalStorageType, params?: string) => any

const getItem = (key: string, defaultVal?: any) => {
    const val = window.localStorage.getItem(key)
    return val ? val : defaultVal
}

// 往外取storage，且对storage进行JSON格式化时，可能会报错。所以对于这种storgae，在_try函数中统一处理
const _try = (key: string, origin: any) => {
    if (!origin) return null
    try {
        return JSON.parse(origin)
    } catch (err) {
        // 如果是不正常的storage，则清空当前key
        window.localStorage.removeItem(key)
        // 并返回null
        return null
    }
}

/** 解码(往外取) */
export const decode: CustomObject<LocalStorageType, DecodeFunc> = {
    // --- 静态key ---
    react_im_token: (key) => getItem(key, ''),
    react_im_user_id: (key) => getItem(key, ''),
    react_im_user_nickname: (key) => getItem(key, ''),
    react_im_user_avatar: (key) => getItem(key, ''),
    react_im_illegal_topic_flag_0: (key) => getItem(key, 'refuse'),
    react_im_pc_home_background: (key) => getItem(key, ''),
    react_im_common_emoji: (key) => _try(key, getItem(key, null)),
    react_im_index_confetti: (key) => _try(key, getItem(key, null)),
    react_im_custom_panel_size: (key) => _try(key, getItem(key, null)),
    react_im_colours_text: (key) => Number(getItem(key, 0)),
    react_im_unread_totals: (key) => Number(getItem(key, 0)),
    react_im_auto_theme: (key) => Number(getItem(key, 0)),
    react_im_cur_theme_scheme_order: (key) => Number(getItem(key, 0)),
    react_im_private_msg_input_state: (key) => Number(getItem(key, 0)),
    react_im_friendsCircle_red_dot_time: (key) => Number(getItem(key, 0)),
    // --- 动态key ---
    react_im_room_cache_msg_: (key, id) => _try(`${key}${id}`, getItem(`${key}${id}`, null))
}
