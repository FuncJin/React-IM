import { useState, memo } from 'react'

import Slot from '@components/Slot'

import Emoji from './Emoji'
import Imgs from './Imgs'
import Recorded from './Recorded'

import { cancelBubble } from '@utils/tools/cancelBubble'

import type { FC } from 'react'

import type { MessageStrExtendsType } from './interface'

import './index.less'

const bar = [
    [Emoji, '表情'],
    [Imgs, '图片'],
    [Recorded, '语音']
] as const

const MessageStrExtends: FC<MessageStrExtendsType> = ({ emoji, img, voice }) => {
    const [order, setOrder] = useState(0)
    return (
        <div className="im-message-str-extends" onClick={(ev) => cancelBubble(ev)}>
            {order > -1 ? (
                <div className="im-m-s-e-style">
                    <Slot emoji={emoji} img={img} voice={voice}>
                        {bar[order][0]}
                    </Slot>
                </div>
            ) : null}
            <ul className="im-m-s-e-list">
                {bar.map((style, idx) => (
                    <li
                        key={idx}
                        className={`${idx === order ? 'im-m-s-e-l-highed' : ''}`}
                        onClick={() => setOrder(idx)}>
                        {style[1]}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default memo(MessageStrExtends)
