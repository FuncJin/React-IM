import { useRef, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'

import SlideUpLoad from '@components/SlideUpLoad'

import MapChat from '@pages/Room/Chat/MapChat'

import type { FC, ReactNode, ForwardedRef } from 'react'

import type { ImperativeHandleType } from '@components/SlideUpLoad/interface'
import type { RoomMessageHandleByBody } from '@pages/Room/interface'
import type { Body as BodyType, ImperativeMessageHandleType } from './interface'

/** 消息内容区域 */
const Body: FC<BodyType> = forwardRef(({ idType, props }, ref: ForwardedRef<RoomMessageHandleByBody>) => {
    // 消息列表ref(用于处理滚动条)
    const domRef = useRef<ImperativeHandleType>(null)
    // 子组件ref(用于得到子组件数据(Chat))
    const bodyRef = useRef<ImperativeMessageHandleType & RoomMessageHandleByBody>(null)
    const slipFinish = useCallback((num: number) => bodyRef.current?.pageSize(num) as Promise<ReactNode>, [])
    const oid = useMemo(() => props.oid, [props.oid])
    const setHeader = useCallback(props.setHeader, [props.setHeader])
    const setAllow = useCallback(props.setAllow, [props.setAllow])
    const setScrollPosition = useCallback(() => domRef.current!.slideBottom(), [])
    useImperativeHandle(ref, () => ({
        getCurMsgId: bodyRef.current!.getCurMsgId,
        setCurMsgId: bodyRef.current!.setCurMsgId
    }))
    return (
        <SlideUpLoad className="im-m-r-content" ref={domRef} slipFinish={slipFinish}>
            <MapChat
                ref={bodyRef}
                idType={idType}
                oid={oid}
                setHeader={setHeader}
                setAllow={setAllow}
                setScrollPosition={setScrollPosition}
            />
        </SlideUpLoad>
    )
})

export default memo(Body)
