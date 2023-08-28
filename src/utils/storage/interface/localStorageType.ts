/**
 * 本地所储存的localStorage的key类型
 * - react_im_token: token
 * - react_im_user_id: 用户id
 * - react_im_user_nickname: 用户昵称
 * - react_im_user_avatar: 用户头像
 * - react_im_illegal_topic_flag_0: 协议状态
 * - react_im_pc_home_background: pc端背景图片的url地址
 * - react_im_common_emoji: 最近使用的表情
 * - react_im_cur_theme_scheme_order: 当前主题方案的编号
 * - react_im_auto_theme: 是否希望自动跟随系统主题切换
 * - react_im_room_cache_msg_{id}: 私聊、群聊界面的输入框缓存消息
 * - react_im_index_confetti: 首屏欢迎特效
 * - react_im_unread_totals: 当前未读消息的数量，包含聊天未读消息、好友申请通知、朋友圈通知等等
 * - react_im_custom_panel_size: 用户自定义的面板大小
 * - react_im_colours_text: 消息是否应用彩色文字
 * - react_im_private_msg_input_state: 是否希望在发送私聊消息时，向对方展示我的输入状态
 * - react_im_friendsCircle_red_dot_time: 首页Tab栏朋友圈红点(时间)
 */
export type LocalStorageType =
    | 'react_im_token'
    | 'react_im_user_id'
    | 'react_im_user_nickname'
    | 'react_im_user_avatar'
    | 'react_im_illegal_topic_flag_0'
    | 'react_im_pc_home_background'
    | 'react_im_common_emoji'
    | 'react_im_cur_theme_scheme_order'
    | 'react_im_auto_theme'
    | 'react_im_room_cache_msg_'
    | 'react_im_index_confetti'
    | 'react_im_unread_totals'
    | 'react_im_custom_panel_size'
    | 'react_im_colours_text'
    | 'react_im_private_msg_input_state'
    | 'react_im_friendsCircle_red_dot_time'
