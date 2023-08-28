export type TextAreaType = {
    /** 当前输入框展示的内容 */
    text: string
    /** 当前输入框的onChange事件 */
    onChange: (text: string) => void
    /** 输入框内容的最大字数 */
    maxLength?: number
    /** 按下回车时调用该函数 */
    onEnter?: () => void
    /** 失去焦点时调用 */
    onBlur?: () => void
    /** 输入框Ref */
    ref?: any
    /** 输入键提示 */
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
}
