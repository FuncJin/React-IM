import { useState } from 'react'

import { storage } from '@utils/storage'
import { emoji } from './emoji'

import type { FC } from 'react'

import type { EmojiType } from './interface'

import './index.less'

/** emoji表情面板 */
const Emoji: FC<EmojiType> = ({ onEmoji }) => {
    const _initEmoji = storage.get('react_im_common_emoji')
    const initEmoji = _initEmoji ? _initEmoji : []
    const [commonEmoji, setCommon] = useState([...initEmoji])
    const click = (e: string) => {
        if (commonEmoji.length < 20) commonEmoji.unshift(e)
        else {
            commonEmoji.unshift(e)
            commonEmoji.pop()
        }
        const _newCommonEmoji: string[] = [...new Set(commonEmoji)]
        storage.set('react_im_common_emoji', _newCommonEmoji)
        setCommon(_newCommonEmoji)
        onEmoji(e)
    }
    return (
        <div className="im-message-str-extends-emoji">
            <div>
                <p className="im-m-s-e-e-title">最近使用</p>
                {commonEmoji.length
                    ? commonEmoji.map((e, key) => (
                          <span key={key} onClick={() => click(e)}>
                              {e}
                          </span>
                      ))
                    : null}
            </div>
            <div>
                <p className="im-m-s-e-e-title">全部</p>
                {emoji.map((e, key) => (
                    <span key={key} onClick={() => click(e)}>
                        {e}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Emoji
