import { useState } from 'react'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'

import type { Colors_react_im_index_confetti, Emojis_react_im_index_confetti } from '@utils/storage/interface/confetti'

const colors: Colors_react_im_index_confetti = {
    order: 1,
    configs: { confettiNumber: 160 }
}
const emojis: Emojis_react_im_index_confetti = {
    order: 2,
    configs: {
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🎉'],
        confettiNumber: 55
    }
}
// 平台提供的默认选项
const bar = [
    ['关闭', () => storage.remove('react_im_index_confetti')],
    ['以颜色纸屑作为特效', () => storage.set('react_im_index_confetti', colors)],
    ['以表情作为特效', () => storage.set('react_im_index_confetti', emojis)]
] as const

const getCurConfetti = (curConfetti: typeof colors | typeof emojis | null) => (curConfetti ? curConfetti : { order: 0 })

/** 首屏欢迎特效 */
const Confetti = () => {
    // 当前选中的编号
    const [order, setOrder] = useState(getCurConfetti(storage.get('react_im_index_confetti')).order)
    const switchSelected = useEventCallback((o: number) => {
        return () => {
            setOrder(o)
            bar[o][1]()
        }
    })
    return (
        <Sideslip title="首屏欢迎特效">
            <CommonRow
                title="是否允许在初次进入页面时向你展示欢迎特效"
                list={bar.map(([text], idx) => ({ text, click: switchSelected(idx) }))}
                selected={order}
            />
        </Sideslip>
    )
}

export default Confetti
