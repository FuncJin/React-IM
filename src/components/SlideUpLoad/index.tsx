import { useState, useRef, useImperativeHandle, forwardRef, memo } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import type { ReactNode, ForwardedRef, WheelEvent } from 'react'

import type { ImperativeHandleType, SlideUpLoadType } from './interface'

import './index.less'

/** 将滚动条置于最底部 */
const toScrollY = (dom: any, distance?: number) => {
    try {
        if (dom) {
            // 20px: padding-top
            dom.scrollTop = distance ? distance + 20 : dom.scrollHeight
        }
    } catch (error) {}
}

/** 上滑加载 */
const SlideUpLoad = (props: SlideUpLoadType, ref: ForwardedRef<ImperativeHandleType>) => {
    const { className, slipFinish, children } = props
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState<ReactNode>('')
    const [pageSize, setPageSize] = useState(1)
    const scrollArea = useRef<HTMLDivElement & ImperativeHandleType>(null)
    /** 滚轮滚动事件 */
    const wheel = (ev: WheelEvent<HTMLDivElement>) => {
        const scrollTop = scrollArea.current?.scrollTop as number
        if (scrollTop <= 0 && ev.deltaY < 0) scroll()
    }
    /** 滚动条滚动事件 */
    const scroll = async () => {
        if (pageSize < 0) return
        const distance = scrollArea.current!.scrollTop
        if (distance) return
        // 必须等待上次加载事件完成后才能发起下次请求
        if (loading) return
        setLoading(true)
        const result = await slipFinish(pageSize + 1)
        if (!result) {
            setLoading(false)
            setPageSize(pageSize + 1)
            return
        }
        // 没有可上滑的必要性了
        setPageSize(-1)
        setFeedback(result)
    }
    useImperativeHandle(ref, () => {
        const changeScrollTop = (distance?: number) => toScrollY(scrollArea.current, distance)
        return {
            slideDesignatedSpot: (distance: number) => changeScrollTop(distance),
            slideBottom: () => changeScrollTop()
        }
    })
    return (
        <div className={className} ref={scrollArea} onWheel={wheel} onScroll={scroll}>
            {loading ? (
                <div className="im-panel-slide-up-loading">
                    {feedback ? feedback : <LoadingOutlined className="im-p-su-l-color" />}
                </div>
            ) : null}
            {children}
        </div>
    )
}

export default memo(forwardRef(SlideUpLoad))
