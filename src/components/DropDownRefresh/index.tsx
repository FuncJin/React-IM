import { useState, memo } from 'react'

import type { FC } from 'react'

import type { StopTypes, RefreshType, MouseEventAction } from './interface'

import './index.less'

/** 下拉距离 */
let initDisance = 0

/** 下拉刷新 */
const DropDownRefresh: FC<RefreshType> = ({ plan, lastDisance, successFunc, children }) => {
    // 当前下拉刷新的进度
    const [currentStop, setCurrentStop] = useState<StopTypes>('init')
    // 标识鼠标是否按下
    const [isDown, setDownStatus] = useState(false)
    // 下拉动作
    const [top, setTop] = useState(0)
    // 刷新完成时的过渡样式
    const [ani, setAni] = useState('')
    /** 去请求的动作 */
    const toRequest = async () => {
        setCurrentStop('loading')
        // 发起请求函数
        await successFunc()
        setCurrentStop('succeed')
        setTop(0)
        setAni('im-p-d-r-slide-ani')
        setTimeout(() => setAni(''), 1000 * 3)
    }
    /** 鼠标按下事件 */
    const mouseDownHandle: MouseEventAction<void> = (ev) => {
        if (currentStop === 'loading') return
        setDownStatus(true)
        initDisance = ev.pageY
    }
    /** 鼠标移动事件 */
    const mouseMoveHandle: MouseEventAction = async (ev) => {
        if (currentStop === 'loading') return
        if (!isDown) return
        const slideDistance = ev.pageY - initDisance
        // 是否超过了预定义的下拉距离
        if (slideDistance >= lastDisance) return setCurrentStop('passedDistance')
        setCurrentStop('init')
        setTop(slideDistance < 0 ? 0 : slideDistance)
    }
    /** 鼠标松开事件 */
    const mouseUpHandle: MouseEventAction = async (ev) => {
        if (currentStop === 'loading') return
        if (!isDown) return
        setDownStatus(false)
        const slideDistance = ev.pageY - initDisance
        // 是否超过了预定义的下拉距离
        if (!(slideDistance >= lastDisance)) return
        await toRequest()
    }
    /** 鼠标离开事件 */
    const mouseLeaveHandle: MouseEventAction = async (ev) => {
        if (currentStop === 'loading') return
        if (!isDown) return
        setDownStatus(false)
        const slideDistance = ev.pageY - initDisance
        // 是否超过了预定义的下拉距离
        if (!(slideDistance >= lastDisance)) return
        // 鼠标在离开时，如果已经下拉至可以刷新的界限，则执行下拉刷新动作
        await toRequest()
    }
    return (
        <div className="im-pull-down-refresh">
            <div className="im-p-d-r-tip">{plan[currentStop]}</div>
            <div
                className={`im-p-d-r-slide-body ${ani}`}
                style={{ top }}
                onMouseDown={mouseDownHandle}
                onMouseMove={mouseMoveHandle}
                onMouseUp={mouseUpHandle}
                onMouseLeave={mouseLeaveHandle}>
                {children}
            </div>
        </div>
    )
}

export default memo(DropDownRefresh)
