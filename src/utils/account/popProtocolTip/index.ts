import Protocol from '@components/Protocol'
import { message } from '@components/Message'

import { storage } from '@utils/storage'

/** 登录或注册时弹出协议提示 */
export const popProtocolTip = (title: string, succeed: () => void) =>
    message({
        title,
        options: [
            { text: '拒绝', color: 'red' },
            {
                click: () => {
                    storage.set('react_im_illegal_topic_flag_0', 'agree')
                    succeed()
                },
                text: '我已知晓并同意',
                weight: '700'
            }
        ],
        center: false,
        Children: Protocol
    })
