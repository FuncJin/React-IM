import { useEffect, memo } from 'react'

import { message } from '@components/Message'

import RenderSingleMsg from './RenderSingleMsg'

import { timeUtils } from '@utils/time'

import { sendPrivateUnreadMsgStateHttpApi } from '@api/http/url/send/private/state'
import { delPrivateMsgHttpApi } from '@api/http/url/del/friend/msg'

import type { FC } from 'react'

import type { ChatChildrenType } from '@pages/Room/Chat/interface'
import type { PrivateMessage } from '@api/http/url/get/message/friend/interface'

/** 私聊聊天界面 */
const Private: FC<ChatChildrenType<PrivateMessage[]>> = ({ id, curMsgId, setCurMsgId, historyMessage }) => {
    /** 撤回私聊消息 */
    const delPrivateMsg = (time: number) => {
        setCurMsgId(0)
        if (!timeUtils.isPreFiveMinsTime(time)) return message({ title: '只能撤回5分钟之内的消息' })
        return delPrivateMsgHttpApi.api({ id, time })({ failed: { func: () => message({ title: '撤回失败' }) } })
    }
    useEffect(() => {
        // 当前用户进入此聊天界面后，对方发送的所有消息均为已读状态
        sendPrivateUnreadMsgStateHttpApi(id)()
    }, [])
    return (
        <ul>
            {historyMessage.map((single, idx) => (
                <RenderSingleMsg
                    key={idx}
                    idx={idx}
                    delMsg={delPrivateMsg}
                    curMsgId={curMsgId}
                    setCurMsgId={setCurMsgId}
                    {...single}
                />
            ))}
        </ul>
    )
}

export default memo(Private)
