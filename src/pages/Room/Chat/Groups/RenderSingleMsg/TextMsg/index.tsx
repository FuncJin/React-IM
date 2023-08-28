import { Popover } from 'antd'

import TourAxios from '@components/TourAxios'
import CalcRoleRelation from '@components/Groupchat/CalcRoleRelation'
import renderColoursText from '@components/RenderColoursText'
import { message } from '@components/Message'

import PopUpMenuTitle from '@pages/Room/MessageRender/PopUpMenuTitle'
import PopBar from '@pages/Room/MessageRender/PopBar'

import { storage } from '@utils/storage'
import { decodeLink } from '@utils/tools/decodeLink'
import { doVibrate } from '@utils/device/vibrate'
import { msgBar } from '@pages/Room/Chat/MsgRenderBar/msgBar'

import { delGroupsMsgHttpApi } from '@api/http/url/del/groupchat/msg'
import { sendGroupsPattedHttpApi } from '@api/http/url/send/groups/patted'

import type { FC } from 'react'

import type { GroupsMessage } from '@api/http/url/get/message/groups/interface'
import type { RenderSingleMsg } from '@pages/Room/Chat/interface'
import type { RenderSingleGroupsMsg } from '@pages/Room/Chat/Groups/interface'
import type { TextMsgSelfType } from '@pages/Room/interface'

/** 每条文字消息 */
const TextMsg: FC<RenderSingleMsg<GroupsMessage & RenderSingleGroupsMsg & TextMsgSelfType>> = ({
    id,
    gid,
    nickname,
    role,
    msg,
    time,
    delMsg,
    curMsgId,
    setCurMsgId,
    selfRole,
    isSelf,
    type,
    data
}) => {
    const isColoursText = storage.get('react_im_colours_text')
    // 消息功能
    const basisFeature = (
        <div onClick={() => setCurMsgId(0)}>
            <div>
                {isSelf ? null : (
                    <div className="im-m-r-c-msg-feature-body">
                        <TourAxios
                            name={sendGroupsPattedHttpApi.url}
                            disabled="拍一拍"
                            before={() => {
                                doVibrate(300)
                                return true
                            }}
                            api={() =>
                                sendGroupsPattedHttpApi.api({ gid, oid: id })({
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
    const delGroupsMsg = (
        <div onClick={() => setCurMsgId(0)}>
            <div className="im-m-r-c-msg-feature-body">
                <TourAxios
                    name={delGroupsMsgHttpApi.url}
                    disabled="撤回消息"
                    api={() => delMsg(id, time)}
                    loading={{ children: '撤回中' }}>
                    撤回消息
                </TourAxios>
            </div>
        </div>
    )
    const MsgFeature = (
        <CalcRoleRelation
            self={selfRole}
            other={role}
            hostToHost={
                <div>
                    {delGroupsMsg}
                    {basisFeature}
                </div>
            }
            hostToAdmins={
                <div>
                    {delGroupsMsg}
                    {basisFeature}
                </div>
            }
            hostToCommons={
                <div>
                    {delGroupsMsg}
                    {basisFeature}
                </div>
            }
            adminsToHost={<div>{basisFeature}</div>}
            adminsToAdmins={
                isSelf ? (
                    <div>
                        {delGroupsMsg}
                        {basisFeature}
                    </div>
                ) : (
                    <div>{basisFeature}</div>
                )
            }
            adminsToCommons={
                <div>
                    {delGroupsMsg}
                    {basisFeature}
                </div>
            }
            commonsToHost={<div>{basisFeature}</div>}
            commonsToAdmins={<div>{basisFeature}</div>}
            commonsToCommons={
                <div>
                    {delGroupsMsg}
                    {basisFeature}
                </div>
            }
        />
    )
    return (
        <Popover
            placement={isSelf ? 'topRight' : 'topLeft'}
            title={<PopUpMenuTitle msg={`${nickname}：${msg}`} cancel={() => setCurMsgId(0)} />}
            content={MsgFeature}
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
