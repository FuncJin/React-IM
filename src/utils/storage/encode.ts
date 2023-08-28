import type { CustomObject } from '@interface/type'
import type { LocalStorageType } from './interface/localStorageType'

type EncodeFunc = (key: LocalStorageType, value: any, params?: string) => void

const setItem = (key: string, value: any) => window.localStorage.setItem(key, value)

/** 编码(往里存) */
export const encode: CustomObject<LocalStorageType, EncodeFunc> = {
    // --- 静态key ---
    react_im_token: (key, value) => setItem(key, value),
    react_im_user_id: (key, value) => setItem(key, value),
    react_im_user_nickname: (key, value) => setItem(key, value),
    react_im_user_avatar: (key, value) => setItem(key, value),
    react_im_illegal_topic_flag_0: (key, value) => setItem(key, value),
    react_im_pc_home_background: (key, value) => setItem(key, value),
    react_im_common_emoji: (key, value) => setItem(key, JSON.stringify(value)),
    react_im_index_confetti: (key, value) => setItem(key, JSON.stringify(value)),
    react_im_custom_panel_size: (key, value) => setItem(key, JSON.stringify(value)),
    react_im_colours_text: (key, value) => setItem(key, value),
    react_im_unread_totals: (key, value) => setItem(key, value),
    react_im_auto_theme: (key, value) => setItem(key, value),
    react_im_cur_theme_scheme_order: (key, value) => setItem(key, value),
    react_im_private_msg_input_state: (key, value) => setItem(key, value),
    react_im_friendsCircle_red_dot_time: (key, value) => setItem(key, value),
    // --- 动态key ---
    react_im_room_cache_msg_: (key, value, id) => setItem(`${key}${id}`, JSON.stringify(value))
}
