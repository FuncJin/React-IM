import ReactDOM from 'react-dom/client'

import Message from '@components/Message/MsgComponent'
import Drawer from '@components/Drawer/DrawerComponent'
import PreviewImg from '@components/PreviewImg/PreviewImgComponent'
import PlayVoice from '@components/PlayVoice/PlayVoiceComponent'
import Slot from '@components/Slot'

import type { CreateElementType } from './interface'

/** 某个类型的组件已渲染了多少次 */
let queueCounts = {
    message: 0,
    drawer: 0,
    previewImg: 0,
    playVoice: 0
}

const actions = {
    message: Message,
    drawer: Drawer,
    previewImg: PreviewImg,
    playVoice: PlayVoice
}

/** 创建html元素 */
const createElement: CreateElementType = (type, props) => {
    // 每次调用createElement函数，均生成新div
    const _imDiv = document.createElement('div')
    document.querySelector(`#im-${type}-ask-box`)!.appendChild(_imDiv)
    // 数量+1
    queueCounts[type] += 1
    const container = ReactDOM.createRoot(_imDiv)
    const close = () => {
        // 数量-1
        queueCounts[type] -= 1
        container.unmount()
        // 删除自身dom节点
        _imDiv.remove()
    }
    return container.render(
        <Slot isBg={queueCounts[type] === 1} {...props} close={close}>
            {actions[type]}
        </Slot>
    )
}

export default createElement
