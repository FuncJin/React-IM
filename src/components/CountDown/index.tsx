import { useState, memo } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import { timeUtils } from '@utils/time'

import type { FC, ReactNode } from 'react'

import type { CountDownType, CountDownShowFormatter } from './interface'

import './index.less'

/** 倒计时 */
const CountDown: FC<CountDownType> = ({
    text,
    tip,
    endText,
    dur,
    formatter,
    durClick,
    almostEndSeconds,
    willStartCounting
}) => {
    // 当前正在显示的内容
    const [content, setContent] = useState<ReactNode>(text)
    // 是否计时完毕
    const [isEnd, setIsEnd] = useState(true)
    // 是否已进入最后的计时区间
    const [isAlmostEnd, setIsAlmostEnd] = useState(false)
    // 是否正在进行前置工作
    const [loading, setLoading] = useState(false)
    /** 更新时间 */
    const updateTime = ({ mins, seconds }: CountDownShowFormatter) => {
        /** 初始格式 */
        const time = `${timeUtils.timeDigitFormat(mins)}:${timeUtils.timeDigitFormat(seconds)}`
        /** 是否自定义展示的格式 */
        const _content = formatter ? formatter(time) : time
        // 是否接近计时结束，并改变文字颜色
        if (almostEndSeconds) {
            if (mins * 60 + seconds <= almostEndSeconds) setIsAlmostEnd(true)
        }
        setContent(_content)
    }
    /** 开始计时 */
    const start = async () => {
        if (willStartCounting) {
            // 进行前置之前，展现加载动画
            setLoading(true)
            const isStart = await willStartCounting()
            setLoading(false)
            if (!isStart) return
        }
        setIsEnd(false)
        let mins = Math.floor(dur / (1000 * 60))
        let seconds = Math.floor(dur / 1000) - mins * 60
        updateTime({ mins, seconds })
        const timerId = setInterval(() => {
            seconds--
            // 当前分钟过完了
            if (seconds < 0) {
                mins--
                // 当前分钟也过完了
                if (mins < 0) {
                    clearInterval(timerId)
                    setIsEnd(true)
                    setIsAlmostEnd(false)
                    setContent(endText ? endText : text)
                    return
                }
                seconds = 59
            }
            updateTime({ mins, seconds })
        }, 1000)
    }
    const handleCountDown = () => {
        if (loading) return
        // 在持续时间内进行单击
        if (!isEnd) return durClick && durClick()
        start()
    }
    return loading ? (
        <span>
            {tip ? tip : '请稍后'}&nbsp;&nbsp;
            <LoadingOutlined />
        </span>
    ) : (
        <span className={`${isAlmostEnd ? 'im-panel-count-down-lase-text' : ''}`} onClick={handleCountDown}>
            {content}
        </span>
    )
}

export default memo(CountDown)
