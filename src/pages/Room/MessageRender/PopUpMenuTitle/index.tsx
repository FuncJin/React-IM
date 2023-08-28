import { CloseCircleOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { PopUpMenuTitleType } from './interface'

/** 消息弹出层 */
const PopUpMenuTitle: FC<PopUpMenuTitleType> = ({ msg, cancel }) => {
    const _msg = msg.replace(/<br\/>/g, '')
    return (
        <div className="im-m-r-c-msg-feature">
            <span className="im-m-r-c-m-f-title">“{_msg.length > 10 ? `${_msg.slice(0, 6)}...` : _msg}”</span>
            <CloseCircleOutlined
                onClick={(ev) => {
                    ev.stopPropagation()
                    cancel()
                }}
            />
        </div>
    )
}

export default PopUpMenuTitle
