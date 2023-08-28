import type { CustomKeyByObject, CustomObject } from '@interface/type'
import type { NumberKey, NumberFlagKey, StringKey } from './commonKey'
import type { Colors_react_im_index_confetti, Emojis_react_im_index_confetti } from './confetti'

export type Get = {
    (key: 'react_im_illegal_topic_flag_0'): 'agree' | 'refuse'
    (key: 'react_im_common_emoji'): string[] | null
    (key: 'react_im_custom_panel_size'): CustomKeyByObject<'width' | 'height'> | null
    (key: 'react_im_index_confetti'): Colors_react_im_index_confetti | Emojis_react_im_index_confetti | null
    (key: 'react_im_room_cache_msg_', id: string): (CustomObject<'time', number> & CustomObject<'msg', string>) | null
    (key: NumberFlagKey): 0 | 1
    (key: NumberKey): number
    (key: StringKey): string
}
