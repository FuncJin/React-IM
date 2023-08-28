import { useState, useEffect, useMemo, memo, useRef, useImperativeHandle, useCallback, forwardRef } from 'react'

import { LoadingOutlined, PlusSquareOutlined, MinusSquareOutlined, SendOutlined } from '@ant-design/icons'

import { message } from '@components/Message'
import MessageStrExtends from '@components/MessageStrExtends'
import TextArea from '@components/TextArea'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'
import { storage } from '@utils/storage'
import { getCurDeviceType } from '@utils/device/curDeviceType'
import { debounce } from '@utils/tools/debounce'
import { constant } from '@constant'

// 私聊消息Http Api
import { sendPrivateTextMsgHttpApi } from '@api/http/url/send/private/textMsg'
import { sendPrivateImgMsgHttpApi } from '@api/http/url/imgs/message/private'
import { sendPrivateVoiceMsgHttpApi } from '@api/http/url/voice/message/private'
// 群聊消息Http Api
import { sendGroupsTextMsgHttpApi } from '@api/http/url/send/groups/textMsg'
import { sendGroupsImgMsgHttpApi } from '@api/http/url/imgs/message/groups'
import { sendGroupsVoiceMsgHttpApi } from '@api/http/url/voice/message/groups'

// Socket Api
import { socketEventsByEmitApi } from '@api/socket/events/emit'

import type { FC, ForwardedRef } from 'react'
import type { InputRef } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'

import type { RoomMessageHandleByFooter } from '@pages/Room/interface'
import type { FooterType } from './interface'

const uid = storage.get('react_im_user_id')
const isPc = getCurDeviceType() === 'pc'

/** 输入状态开关 */
const getInputStateSwitch = () => storage.get('react_im_private_msg_input_state')

/** Footer栏 */
const Footer: FC<FooterType> = forwardRef(({ allow, idType, oid }, ref: ForwardedRef<RoomMessageHandleByFooter>) => {
    // 是否要发送表情、图片(等非文字内容的消息)
    const [isMsgStyle, setIsMsgStyle] = useState(false)
    // 待发送的文字消息
    const [msg, setMsg] = useState('')
    // 是否正在发送中
    const [loading, setLoaidng] = useState(false)
    const textareaRef = useRef<InputRef>(null)
    const getCurMsgStyleState = useEventCallback(() => isMsgStyle)
    useImperativeHandle(ref, () => ({ getCurMsgStyleState, setIsMsgStyle }))
    /** 主动聚焦 */
    const toFocus = () => {
        // 只在PC端下进行主动聚焦的行为
        if (!isPc) return
        textareaRef.current?.focus({ cursor: 'end' })
    }
    const sendBefore = useEventCallback((isSend?: boolean) => {
        if (appRules.contentLimit['1_100'](msg)) {
            isSend && sendMsg()
            return true
        }
        textareaRef.current?.blur()
        message({ title: '消息内容', Children: '你输入的内容不在1~100字符之间' })
        return false
    })
    const handleOnChange = useCallback(
        debounce({
            every: (msg: string) => {
                // 修改输入框内容
                setMsg(msg)
                // 自己的输入状态(用来告知对方)
                if (idType === 'uid' && getInputStateSwitch())
                    socketEventsByEmitApi.private.state.input({ self: uid, other: oid, isEnd: false })
            },
            end: () =>
                idType === 'uid' && getInputStateSwitch()
                    ? socketEventsByEmitApi.private.state.input({ self: uid, other: oid, isEnd: true })
                    : null,
            delay: 300
        }),
        []
    )
    const blur = useEventCallback(() => {
        // 失去焦点时，自动记录未发送的消息内容(有效时间10分钟)
        const body = { time: Number(new Date()) + constant.time.min._10, msg }
        storage.set('react_im_room_cache_msg_', body, oid)
    })
    useEffect(() => {
        // 挂载后，自动聚焦
        toFocus()
        // 10分钟之内，是否缓存过自己未发送的消息
        const cacheInputMsg = storage.get('react_im_room_cache_msg_', oid)
        if (!cacheInputMsg) return
        // 上次未发送的消息是否还在有效时间内
        if (Number(new Date()) >= cacheInputMsg.time) return
        // 如果在指定时间内，但消息为空，则不回填
        if (!cacheInputMsg.msg) return
        setMsg(cacheInputMsg.msg)
    }, [])
    // 发消息时(发消息的api留在了此处)
    const sendMsg = useEventCallback(() => {
        // 消息格式
        if (!sendBefore()) return
        setLoaidng(true)
        // 收起面板
        setIsMsgStyle(false)
        const sendApi = idType === 'uid' ? sendPrivateTextMsgHttpApi : sendGroupsTextMsgHttpApi
        // 开始发送时。将已输入的消息清空
        setMsg('')
        return sendApi({ id: oid, msg })({
            succeed: {
                func: () => {
                    // 清空与对方的缓存消息
                    storage.set('react_im_room_cache_msg_', { time: 0, msg: '' }, oid)
                    toFocus()
                }
            },
            failed: {
                func: () => {
                    // 如果发送失败，则将未能成功发送的消息进行回填
                    setMsg(msg)
                    message({ title: `“${msg}”未能发出` })
                    // 失焦
                    textareaRef.current?.blur()
                }
            },
            finally: () => setLoaidng(false)
        })
    })
    const strEmoji = useMemo(
        () => ({
            onEmoji: (emoji: string) => {
                setMsg(msg + emoji)
                toFocus()
            }
        }),
        [msg]
    )
    const strImg = useMemo(
        () =>
            ({
                imgApi: async (file: RcFile) => {
                    setLoaidng(true)
                    setIsMsgStyle(false)
                    idType === 'uid'
                        ? sendPrivateImgMsgHttpApi({ file, uid, oid })({
                              succeed: { func: toFocus },
                              finally: () => setLoaidng(false)
                          })
                        : sendGroupsImgMsgHttpApi({ file, id: oid })({
                              succeed: { func: toFocus },
                              finally: () => setLoaidng(false)
                          })
                },
                feedbackByIm: true,
                title: { upload: '要发送该图片吗？' },
                cancelText: '取消'
            } as const),
        []
    )
    const strVoice = useMemo(
        () => ({
            succeed: (file: any) => {
                const api = () => {
                    setLoaidng(true)
                    setIsMsgStyle(false)
                    idType === 'uid'
                        ? sendPrivateVoiceMsgHttpApi({ file, uid, oid })({
                              succeed: { func: toFocus },
                              finally: () => setLoaidng(false)
                          })
                        : sendGroupsVoiceMsgHttpApi({ file, id: oid })({
                              succeed: { func: toFocus },
                              finally: () => setLoaidng(false)
                          })
                }
                message({
                    title: '要发送该语音吗？',
                    options: [{ text: '取消' }, { text: '确定', click: () => api(), color: 'red' }],
                    blockShow: true
                })
            }
        }),
        []
    )
    const MsgStyle = isMsgStyle ? (
        <MinusSquareOutlined onClick={() => setIsMsgStyle(false)} />
    ) : (
        <PlusSquareOutlined onClick={() => setIsMsgStyle(true)} />
    )
    return (
        <div className={`im-m-r-send ${allow ? 'im-m-r-send-boder-top' : ''}`} onClick={(ev) => ev.stopPropagation()}>
            <div
                className="im-m-r-send-body"
                style={{
                    animation: `${
                        isMsgStyle ? 'im-move-to-top-2rem-bounce 0.3s' : 'im-move-to-bottom-2rem-bounce 0.2s'
                    }`
                }}>
                {allow ? (
                    <div className="im-m-r-s-no-allow">{allow}</div>
                ) : (
                    <>
                        <div className="im-m-r-s-textarea">
                            <TextArea
                                ref={textareaRef}
                                text={msg}
                                onChange={handleOnChange}
                                onEnter={sendMsg}
                                onBlur={blur}
                            />
                            <div className="im-m-r-s-t-no-icons">
                                <div>{MsgStyle}</div>
                                {loading ? (
                                    <LoadingOutlined />
                                ) : (
                                    <p onClick={() => sendBefore(true)}>
                                        <SendOutlined />
                                    </p>
                                )}
                            </div>
                        </div>
                        {isMsgStyle ? <MessageStrExtends emoji={strEmoji} img={strImg} voice={strVoice} /> : null}
                    </>
                )}
            </div>
        </div>
    )
})

export default memo(Footer)
