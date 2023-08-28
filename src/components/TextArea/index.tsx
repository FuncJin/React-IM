import { useRef, forwardRef, useImperativeHandle } from 'react'

import { Input } from 'antd'

import { getCurDeviceType } from '@utils/device/curDeviceType'

import type { FC, KeyboardEvent, ForwardedRef } from 'react'
import type { InputRef } from 'antd'

import type { TextAreaType } from './interface'

/** 输入框 */
const TextArea: FC<TextAreaType> = forwardRef((props, ref: ForwardedRef<InputRef>) => {
    const { text, onChange, maxLength, onEnter, onBlur } = props
    const textareaRef = useRef<InputRef>(null)
    const handleKeydown = (ev: KeyboardEvent<HTMLTextAreaElement>) => {
        // 移动端、平板下，换行就是换行，不进行任何操作
        if (!(getCurDeviceType() === 'pc')) return
        // 不是enter或shift+enter时，不取消默认事件
        if (ev.keyCode !== 13) return
        ev.preventDefault()
        // Shift+Enter换行
        if (ev.shiftKey && ev.keyCode === 13) return onChange(text + '\n')
        // 按下回车时调用
        onEnter && onEnter()
    }
    useImperativeHandle(ref, () => ({ ...textareaRef.current! }))
    return (
        <Input.TextArea
            ref={textareaRef}
            placeholder="Enter发送，Shift+Enter换行"
            maxLength={maxLength ? maxLength : 100}
            bordered={false}
            autoSize={{ maxRows: 5 }}
            onChange={(ev) => onChange(ev.target.value)}
            onKeyDown={handleKeydown}
            value={text}
            onBlur={() => onBlur && onBlur()}
        />
    )
})

export default TextArea
