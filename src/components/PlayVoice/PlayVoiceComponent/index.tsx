import { useState, useEffect, useRef } from 'react'

import LoadingByVerticalLine from '@components/LoadingByVerticalLine'

import { cancelBubble } from '@utils/tools/cancelBubble'

import type { FC } from 'react'

import type { PlayVoiceType } from '@components/PlayVoice/interface'
import type { GlobalCreateElementComponent } from '@utils/dom/createElement/interface'

import './index.less'

/** 全局播放语音 */
const PlayVoice: FC<GlobalCreateElementComponent<PlayVoiceType>> = ({ url, init, cancel, isBg, close }) => {
    // 播放的开关状态
    const [state, setState] = useState(true)
    // 是否在播放中
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const cancelPlay = () => {
        cancel && cancel()
        setState(false)
        setTimeout(close, 300)
    }
    useEffect(() => {
        // 挂载后执行init
        init && init()
        return () => audioRef.current?.pause()
    }, [])
    return (
        <div
            className={`im-dialog-play-voice ${isBg ? 'im-dialog-play-voice-bg' : ''} ${
                state ? '' : 'im-dialog-play-voice-bounce-h'
            }`}
            onClick={cancelPlay}>
            <div
                className={`im-d-p-i-box ${state ? '' : 'im-dialog-play-voice-body-bounce-h'}`}
                onClick={(ev) => cancelBubble(ev)}>
                <div className="im-d-p-i-b-body">{playing ? <LoadingByVerticalLine /> : null}</div>
                <audio
                    ref={audioRef}
                    src={url}
                    onPlay={() => setPlaying(true)}
                    onEnded={() => cancelPlay()}
                    onPause={() => setPlaying(false)}
                    controls>
                    无法播放
                </audio>
            </div>
        </div>
    )
}

export default PlayVoice
