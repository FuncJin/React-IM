import { Popover } from 'antd'

import TourAxios from '@components/TourAxios'
import renderColoursText from '@components/RenderColoursText'
import { message } from '@components/Message'

import PopUpMenuTitle from '@pages/Room/MessageRender/PopUpMenuTitle'
import PopBar from '@pages/Room/MessageRender/PopBar'

import { storage } from '@utils/storage'
import { decodeLink } from '@utils/tools/decodeLink'
import { doVibrate } from '@utils/device/vibrate'
import { msgBar } from '@pages/Room/Chat/MsgRenderBar/msgBar'

import { delPrivateMsgHttpApi } from '@api/http/url/del/friend/msg'
import { sendPrivatePattedHttpApi } from '@api/http/url/send/private/patted'

import type { FC } from 'react'

import type { PrivateMessage } from '@api/http/url/get/message/friend/interface'
import type { RenderSingleMsg as RenderSingleMsgType } from '@pages/Room/Chat/interface'
import type { RenderSinglePrivateMsg } from '@pages/Room/Chat/Private/interface'
import type { TextMsgSelfType } from '@pages/Room/interface'

/** 每条消息(以消息气泡展示的文字) */
const TextMsg: FC<RenderSingleMsgType<PrivateMessage & RenderSinglePrivateMsg & TextMsgSelfType>> = ({
    id,
    isSelf,
    msg,
    setCurMsgId,
    delMsg,
    curMsgId,
    time,
    type,
    data
}) => {
    const isColoursText = storage.get('react_im_colours_text')
    /** 消息功能 */
    const msgFeature = (
        <div onClick={() => setCurMsgId(0)}>
            <div>
                {isSelf ? (
                    <div className="im-m-r-c-msg-feature-body">
                        <TourAxios
                            name={delPrivateMsgHttpApi.url}
                            disabled="撤回消息"
                            api={() => delMsg(time)}
                            loading={{ children: '撤回中' }}>
                            撤回消息
                        </TourAxios>
                    </div>
                ) : null}
            </div>
            <div>
                {isSelf ? null : (
                    <div className="im-m-r-c-msg-feature-body">
                        <TourAxios
                            name={sendPrivatePattedHttpApi.url}
                            disabled="拍一拍"
                            before={() => {
                                doVibrate(300)
                                return true
                            }}
                            api={() =>
                                sendPrivatePattedHttpApi.api(id)({
                                    failed: { func: () => message({ title: '拍一拍失败' }) }
                                })
                            }
                            loading={{ children: '正在去拍' }}
                            after={{ end: () => setCurMsgId(0) }}>
                            拍一拍
                        </TourAxios>
                    </div>
                )}
            </div>
            <PopBar msg={msg} type={type} data={data} />
        </div>
    )
    return (
        <Popover
            placement={isSelf ? 'topRight' : 'topLeft'}
            title={<PopUpMenuTitle msg={msg} cancel={() => setCurMsgId(0)} />}
            content={msgFeature}
            trigger="click"
            open={curMsgId === time}>
            {(msgBar as any)[type] ? (
                (msgBar as any)[type]({ setCurMsgId, time, isSelf, data })
            ) : (
                <div
                    className="im-m-r-c-m-r-content"
                    onClick={(ev: any) =>
                        ev.target.getAttribute('id') === 'im-decode-link-a'
                            ? window.open(ev.target.getAttribute('href'), '_blank')
                            : setCurMsgId(time)
                    }
                    dangerouslySetInnerHTML={{ __html: decodeLink(isColoursText ? renderColoursText(msg) : msg) }}
                />
            )}
        </Popover>
    )
}

export default TextMsg
