/** 全局播放语音的组件类型 */
export type PlayVoiceType = {
    /** 要播放的语音(url) */
    url: string
    /** 播放组件挂载后会调用该函数 */
    init?: () => void
    /** 播放结束时调用该函数 */
    cancel?: () => void
}
