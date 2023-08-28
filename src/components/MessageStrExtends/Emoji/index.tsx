import EmojiPanel from '@components/Emoji'

import type { FC } from 'react'

import type { EmojiType } from './interface'

/** 表情面板 */
const Emoji: FC<EmojiType> = ({ emoji }) => <EmojiPanel {...emoji} />

export default Emoji
