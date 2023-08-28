import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'

import Message from '@pages/Panel/Message'
import Contacts from '@pages/Panel/Contacts'
import FriendsCircle from '@pages/Panel/FriendsCircle'

import DropDownRefresh from '@components/DropDownRefresh'

import type { Ref } from './interface'

/** 下拉刷新的距离 */
const lastDisance = 60
/** 下拉刷新的每个进度表示 */
const plan = {
    init: <span>下拉刷新</span>,
    passedDistance: <span>松开刷新</span>,
    loading: (
        <span>
            正在刷新&nbsp;&nbsp;
            <LoadingOutlined />
        </span>
    ),
    succeed: <span>刷新成功</span>
}

/** 维护上一个路由路径 */
let lastPath = ''
const pathArrs = ['/message', '/contacts', '/friendsCircle']
const directionMotion = ['im-panel-section-cur-left', 'im-panel-section-cur-right']

const DropDownRefreshBody = () => {
    // 判断向左还是向右运动
    const [direction, setDirection] = useState(-1)
    const { pathname } = useLocation()
    /** message Ref */
    const mRef = useRef<Ref>(null)
    /** contacts Ref */
    const cRef = useRef<Ref>(null)
    /** friendsCircle Ref */
    const fRef = useRef<Ref>(null)
    const getDirectionMotion = () => (directionMotion[direction] ? directionMotion[direction] : '')
    /** 下拉成功时触发的函数 */
    const successFunc = async () => {
        const bar = [
            ['/message', mRef.current?.render],
            ['/contacts', cRef.current?.render],
            ['/friendsCircle', fRef.current?.render]
        ] as const
        const data = bar.find((row) => row[0] === pathname)
        if (!data) return
        const [, func] = data
        await func!()
    }
    useEffect(() => {
        /** 上一个路径的索引 */
        let lastIndex = -1
        /** 当前路径的索引 */
        let curIndex = -1
        pathArrs.forEach((path, idx) => {
            if (path === lastPath) lastIndex = idx
            if (path === pathname) curIndex = idx
        })
        if (curIndex < 0) return
        // 记录当前路径
        lastPath = pathname
        // 向左运动
        if (curIndex > lastIndex) return setDirection(0)
        // 否则向右运动
        setDirection(1)
    }, [pathname])
    return (
        <DropDownRefresh plan={plan} lastDisance={lastDisance} successFunc={successFunc}>
            <Message ref={mRef} className={`${pathname === '/message' ? getDirectionMotion() : ''}`} />
            <Contacts ref={cRef} className={`${pathname === '/contacts' ? getDirectionMotion() : ''}`} />
            <FriendsCircle ref={fRef} className={`${pathname === '/friendsCircle' ? getDirectionMotion() : ''}`} />
        </DropDownRefresh>
    )
}

export default DropDownRefreshBody
