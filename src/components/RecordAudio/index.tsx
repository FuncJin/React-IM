import { useState, useEffect } from 'react'
import JsAudioRecorder from 'js-audio-recorder'

import { LoadingOutlined, AudioOutlined } from '@ant-design/icons'

import LoadingByVerticalLine from '@components/LoadingByVerticalLine'
import { message } from '@components/Message'

import type { FC, ReactNode } from 'react'

import type { CustomObject } from '@interface/type'
import type { RecordAudioState, RecordAudioType } from './interface'

import './index.less'

const barBody: CustomObject<RecordAudioState, ReactNode> = {
    start: <AudioOutlined className="im-r-a-b-img" />,
    starting: (
        <span>
            设备启动中&nbsp;&nbsp;
            <LoadingOutlined />
        </span>
    ),
    recording: <LoadingByVerticalLine />,
    recorded: <AudioOutlined className="im-r-a-b-img" />,
    previewing: <LoadingByVerticalLine />,
    previewed: <AudioOutlined className="im-r-a-b-img" />
}

const recorder = new JsAudioRecorder({
    // 采样位数
    sampleBits: 16,
    // 采样率
    sampleRate: 48000,
    // 声道
    numChannels: 2
})

let timerId = null as any

/** 录制音频 */
const RecordAudio: FC<RecordAudioType> = ({ succeed, failed }) => {
    // 当前的录制状态
    const [state, setState] = useState<RecordAudioState>('start')
    // 当前正录制的时长
    const [recordingDur, setRecordingDur] = useState(0)
    /** 当前所录制完毕的时间 */
    const getRecordedDur = () => Math.round(recorder.duration * 100) / 100
    const getRecordedDurFormatter = () => `约${getRecordedDur()}s`
    /** 预览所录制的内容 */
    const previewAudio = () => {
        // 播放预览
        recorder.play()
        // 将状态切换为预览
        setState('previewing')
        // 预览结束后，将状态切换为预览已结束
        setTimeout(() => setState('previewed'), getRecordedDur() * 1000)
    }
    /** 使用所录制的内容 */
    const useRecordedContent = () => {
        const renameFile = new File([recorder.getWAVBlob()], `${Number(new Date())}.wav`, { type: 'audio/wav' })
        succeed(renameFile)
        setState('start')
        // 销毁实例
        recorder.destroy()
        // 清除已录制的时间
        setRecordingDur(0)
    }
    /** 删除所录制的内容 */
    const delRecordedContent = () => {
        // 销毁实例
        recorder.destroy()
        // 将状态切换为初始状态
        setState('start')
        // 清除已录制的时间
        setRecordingDur(0)
    }
    /** 停止录制 */
    const stopRecording = () => {
        // 停止录制
        recorder.stop()
        // 关闭定时器
        clearInterval(timerId)
        // 清除已录制的时间
        setRecordingDur(0)
        // 将状态切换为录制结束
        setState('recorded')
    }
    const barText: CustomObject<RecordAudioState, ReactNode> = {
        start: (
            <>
                <p>单击后，开始录音</p>
                <p className="im-r-a-t-dur">（时长最多为10s）</p>
            </>
        ),
        starting: <p>请稍后</p>,
        recording: (
            <>
                <p>已录制约{recordingDur}s</p>
                <p>再次单击时，将停止录音</p>
            </>
        ),
        recorded: (
            <>
                <p>录制已结束({getRecordedDurFormatter()})</p>
                <p>
                    你可以选择
                    <span className="im-r-a-t-action" onClick={useRecordedContent}>
                        使用
                    </span>
                    或
                    <span className="im-r-a-t-action" onClick={delRecordedContent}>
                        删除
                    </span>
                    或
                    <span className="im-r-a-t-action" onClick={previewAudio}>
                        预览
                    </span>
                    本次所录制的音频
                </p>
            </>
        ),
        previewing: (
            <>
                <p>总时长{getRecordedDurFormatter()}</p>
                <p>正在播放预览</p>
            </>
        ),
        previewed: (
            <>
                <p> 预览播放完毕，你可以</p>
                <p>
                    <span className="im-r-a-t-action" onClick={useRecordedContent}>
                        使用
                    </span>
                    或
                    <span className="im-r-a-t-action" onClick={delRecordedContent}>
                        删除
                    </span>
                    此预览，或
                    <span className="im-r-a-t-action" onClick={previewAudio}>
                        再次播放
                    </span>
                </p>
            </>
        )
    }
    const barHandler: CustomObject<RecordAudioState, Function> = {
        start: () => {
            setState('starting')
            // 开始录制
            recorder
                .start()
                .then(() => {
                    // 开启定时器
                    timerId = setInterval(
                        () =>
                            setRecordingDur((recordingDur) => {
                                if (recordingDur === 9) {
                                    // 达到录制的最大时长后，自动停止
                                    setTimeout(stopRecording, 100)
                                    return 10
                                }
                                return recordingDur + 1
                            }),
                        1000
                    )
                    // 将状态切换为录制中
                    setState('recording')
                })
                .catch(() => {
                    message({ title: '录制失败', Children: '设备启动时发生错误' })
                    failed && failed()
                    setState('start')
                })
        },
        starting: () => {},
        recording: stopRecording,
        recorded: () => {},
        previewing: () => {},
        previewed: () => {}
    }
    useEffect(() => {
        return () => {
            // 停止录制
            recorder.stop()
            clearInterval(timerId)
        }
    }, [])
    return (
        <div className="im-record-audio">
            <div className="im-r-a-body" onClick={() => barHandler[state]()}>
                {barBody[state]}
            </div>
            <div className="im-r-a-tip">{barText[state]}</div>
        </div>
    )
}

export default RecordAudio
