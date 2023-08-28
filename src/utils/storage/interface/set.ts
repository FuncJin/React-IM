import type { CustomKeyByObject, CustomObject } from '@interface/type'
import type { NumberKey, NumberFlagKey, StringKey } from './commonKey'
import type { Colors_react_im_index_confetti, Emojis_react_im_index_confetti } from './confetti'

export type Set = {
    (key: 'react_im_common_emoji', value: string[]): void
    (key: 'react_im_illegal_topic_flag_0', value: 'agree' | 'refuse'): void
    (key: 'react_im_custom_panel_size', value: CustomKeyByObject<'width' | 'height'>): void
    (key: 'react_im_index_confetti', value: Colors_react_im_index_confetti | Emojis_react_im_index_confetti): void
    (
        key: 'react_im_room_cache_msg_',
        value: CustomObject<'time', number> & CustomObject<'msg', string>,
        id: string
    ): void
    (key: NumberFlagKey, value: 0 | 1): void
    (key: NumberKey, value: number): void
    (key: StringKey, value: string): void
}
