/**
 * 当前录制的状态
 * - start: 初始状态(待开始录制)
 * - starting: 启动设备中(此时未开始录制)
 * - recording: 录制中
 * - recorded: 录制完毕
 * - previewing: 预览中
 * - previewed: 预览完毕
 */
export type RecordAudioState = 'start' | 'starting' | 'recording' | 'recorded' | 'previewing' | 'previewed'

export type RecordAudioType = {
    /** 录制成功，且单击了“使用”按钮后，会调用该函数 */
    succeed: (data: any) => void
    /** 录制失败时，调用该函数 */
    failed?: () => void
}
