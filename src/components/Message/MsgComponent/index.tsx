import { useState, useEffect } from 'react'

import { Button } from 'antd'

import { btnTextColor, btnTextWeight } from './style'

import type { FC, MouseEvent } from 'react'

import type { Feedback, MessageButtonClick, MessageType } from '@components/Message/interface'
import type { GlobalCreateElementComponent } from '@utils/dom/createElement/interface'

import './index.less'

// 默认值为true
const isDedault = (value: boolean | undefined) => (value === undefined ? true : value)

/** 全局消息提示组件 */
const MessageComponent: FC<GlobalCreateElementComponent<MessageType>> = ({
    title,
    Children,
    center,
    options,
    blockShow,
    init,
    close,
    isBg
}) => {
    // 出现和隐藏时的动画效果
    const [state, setState] = useState(true)
    // 是否提供了选项
    const _options = options ? options : [{ text: '确定' }]
    /** 获取每个按钮的样式 */
    const getBtnClassName = (option: Feedback, idx: number) => {
        let className = ''
        const foo = [
            // 是否展示边框线
            [_options.length === 2 && idx === 0, 'im-d-m-options-first'],
            // 是否配置文字颜色
            [option.color, btnTextColor[option.color!]],
            // 是否配置文字字体宽度
            [option.weight, btnTextWeight[option.weight!]]
        ] as const
        foo.forEach(([condition, name]) => (condition ? (className += `${name} `) : null))
        return className
    }
    const cancelMessage = (func?: MessageButtonClick) => {
        return (ev: MouseEvent<HTMLButtonElement>) => {
            setState(false)
            setTimeout(() => {
                func && func(ev)
                close()
            }, 300)
        }
    }
    useEffect(() => {
        init && init()
    }, [])
    return (
        <div
            className={`im-dialog-message ${isBg ? 'im-dialog-message-bg' : ''} ${
                state ? '' : 'im-dialog-message-bounce-h'
            }`}>
            <div className={`im-d-message ${state ? '' : 'im-dialog-message-body-bounce-h'}`}>
                <div className="im-d-m-action">
                    <p className="im-d-m-a-title">{title}</p>
                    <div className={`im-d-m-a-content ${isDedault(center) ? 'im-d-m-a-content-center' : ''}`}>
                        {typeof Children === 'function' ? <Children /> : Children}
                    </div>
                </div>
                <div className={`im-d-m-options ${_options.length > 2 || blockShow ? 'im-d-m-options-column' : ''}`}>
                    {_options.map((option, idx) => (
                        <Button
                            key={idx}
                            type="text"
                            size="small"
                            block
                            className={getBtnClassName(option, idx)}
                            onClick={cancelMessage(option.click)}>
                            {option.text ? option.text : '确定'}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MessageComponent
