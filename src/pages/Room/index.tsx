import { useState, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Sideslip from '@components/Sideslip'

import Header from './Layout/Header'
import Body from './Layout/Body'
import Footer from './Layout/Footer'

import { useEventCallback } from '@hooks'

import { getIdTypeHttpApi } from '@api/http/url/account/type/id'
import { getPreRelationsHttpApi } from '@api/http/url/get/friend/preRelations'
import { getIsJoinGroupchatHttpApi } from '@api/http/url/get/groupchat/isJoin'

import type { AccountType } from '@api/http/url/interface/account'
import type { HeaderType } from '@pages/Room/Layout/Header/interface'
import type { RoomMessageHandleByBody, RoomMessageHandleByFooter } from './interface'

import './index.less'

/** 从路径中取出对方id(或群聊id) */
const getId = (pathname: string) => {
    const oid = /^\/message\/(?<id>\d{4,6})$/.exec(pathname)
    // 此处id已在路由动态守卫中进行过一次校验了
    return oid!.groups!.id
}

/** 聊天界面(私聊、群聊) */
const Room = () => {
    // 标识当前id为哪种id
    const [idType, setIdType] = useState<AccountType>('noid')
    // 对方的描述
    const [header, setHeader] = useState<HeaderType>({ title: '', description: '' })
    // 是否允许发送消息
    const [allow, setAllow] = useState('')
    const bodyRef = useRef<RoomMessageHandleByBody>(null)
    const footerRef = useRef<RoomMessageHandleByFooter>(null)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    // 对方id(好友或群聊)
    const [oid, setOid] = useState(getId(pathname))
    const changeHeader = useEventCallback((_header: HeaderType) => setHeader({ ...header, ..._header }))
    /** 传给聊天界面的数据(Chat) */
    const BodyProps = useMemo(
        () => ({
            oid,
            setHeader: changeHeader,
            setAllow: (reason: string) => setAllow(reason)
        }),
        [oid]
    )
    const handleRoomClick = () => {
        // 如果需要关闭消息的弹出图层
        if (bodyRef.current?.getCurMsgId()) bodyRef.current?.setCurMsgId(0)
        // 如果需要收起输入框面板
        if (footerRef.current?.getCurMsgStyleState()) footerRef.current?.setIsMsgStyle(false)
    }
    useEffect(() => {
        setOid(getId(pathname))
    }, [pathname])
    useEffect(() => {
        // 挂载后判断关系
        Promise.all([getIdTypeHttpApi(oid)(), getPreRelationsHttpApi(oid)(), getIsJoinGroupchatHttpApi(oid)()]).then(
            ([type, preRelation, state]) => {
                // 是否是无效id
                if (type.data === 'noid') return navigate(-1)
                // 是否是用户id
                if (type.data === 'uid') {
                    // 是不是好友关系(也不能是自己)
                    if (preRelation.data) return setIdType(type.data)
                    return navigate(-1)
                }
                // 群聊id时，判断是否加入了该群
                if (!state.data) return navigate(-1)
                setIdType(type.data)
            }
        )
    }, [])
    return (
        <Sideslip isPageHeader={false} isPadding={false} isWhiteBgColor={true}>
            <div className="im-message-room" onClick={handleRoomClick}>
                {idType === 'noid' ? null : (
                    <>
                        <Header oid={oid} title={header.title} description={header.description} />
                        <Body ref={bodyRef} idType={idType} props={BodyProps} />
                        <Footer ref={footerRef} oid={oid} idType={idType} allow={allow} />
                    </>
                )}
            </div>
        </Sideslip>
    )
}

export default Room
