import { useState, useEffect, memo } from 'react'

import { message } from '@components/Message'

import RenderSingleMsg from './RenderSingleMsg'

import { timeUtils } from '@utils/time'
import { storage } from '@utils/storage'

import { delGroupsMsgHttpApi } from '@api/http/url/del/groupchat/msg'
import { changeGroupsUnreadMsgStateHttpApi } from '@api/http/url/send/groups/state'
import { getGroupchatRoleHttpApi } from '@api/http/url/get/groupchat/role'

import type { FC } from 'react'

import type { GroupchatRole } from '@api/http/url/interface/groupchat'
import type { ChatChildrenType } from '@pages/Room/Chat/interface'
import type { GroupsMessage } from '@api/http/url/get/message/groups/interface'

const uid = storage.get('react_im_user_id')

/** 群聊消息 */
const Groups: FC<ChatChildrenType<GroupsMessage[]>> = ({ id, curMsgId, setCurMsgId, historyMessage }) => {
    // 当前用户在当前群聊中的角色
    const [selfRole, setSelfRole] = useState<GroupchatRole>('commons')
    /** 撤回群聊消息 */
    const delGroupsMsg = (del: string, time: number) => {
        setCurMsgId(0)
        if (!timeUtils.isPreFiveMinsTime(time)) return message({ title: '只能撤回5分钟之内的消息' })
        return delGroupsMsgHttpApi.api({ id, del, time, operation: uid })({
            failed: { func: () => message({ title: '撤回失败' }) }
        })
    }
    useEffect(() => {
        // 告知服务端，当前用户在群聊中的最后阅读消息时间点
        changeGroupsUnreadMsgStateHttpApi({ id, time: Number(new Date()) })()
        // 获取当前成员角色
        getGroupchatRoleHttpApi(id)({ succeed: { func: (role) => setSelfRole(role) } })
    }, [])
    return (
        <ul>
            {historyMessage.map((single, idx) => (
                <RenderSingleMsg
                    key={single.time}
                    idx={idx}
                    gid={id}
                    delMsg={delGroupsMsg}
                    curMsgId={curMsgId}
                    selfRole={selfRole}
                    setCurMsgId={setCurMsgId}
                    {...single}
                />
            ))}
        </ul>
    )
}

export default memo(Groups)
