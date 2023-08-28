import { useState, useEffect } from 'react'

import { Switch } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { storage } from '@utils/storage'

/** 消息炫彩字 */
const ColoursText = () => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(Boolean(storage.get('react_im_colours_text')))
    }, [])
    return (
        <Sideslip title="消息炫彩字">
            <CommonRow
                title="是否在聊天界面开启消息炫彩字"
                list={[
                    {
                        text: '消息炫彩字',
                        description: (
                            <Switch
                                checked={open}
                                onChange={(open) => {
                                    setOpen(open)
                                    storage.set('react_im_colours_text', Number(open) as 0 | 1)
                                }}
                            />
                        )
                    }
                ]}
                comment="开启后，你所看到的消息(包含你发出的、与你接收到的)将以炫彩的形式展示"
            />
        </Sideslip>
    )
}

export default ColoursText
