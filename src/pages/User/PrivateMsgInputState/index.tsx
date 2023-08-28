import { useState } from 'react'

import { Switch } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { storage } from '@utils/storage'

/** 输入状态开关 */
const getInputStateSwitch = () => storage.get('react_im_private_msg_input_state')

/** 用户私聊消息的输入状态 */
const PrivateMsgInputState = () => {
    const [open, setOpen] = useState(Boolean(getInputStateSwitch()))
    return (
        <Sideslip title="输入状态">
            <CommonRow
                title="是否希望在输入私聊消息时，向朋友展示我的输入状态"
                list={[
                    {
                        text: '我的输入状态',
                        description: (
                            <Switch
                                checked={open}
                                onChange={(open) => {
                                    setOpen(open)
                                    storage.set('react_im_private_msg_input_state', Number(open) as 0 | 1)
                                }}
                            />
                        )
                    }
                ]}
            />
        </Sideslip>
    )
}

export default PrivateMsgInputState
