import { Link } from 'react-router-dom'

import GroupRole from '@components/Groupchat/RoleIcon'

import TextMsg from './TextMsg'

import { timeUtils } from '@utils/time'
import { storage } from '@utils/storage'

import type { FC } from 'react'

import type { GroupsMessage } from '@api/http/url/get/message/groups/interface'
import type { PattedMessage, GroupsDelMessage } from '@api/http/url/get/message/interface'
import type { RenderSingleMsg as RenderSingleMsgType } from '@pages/Room/Chat/interface'
import type { RenderSingleGroupsMsg } from '@pages/Room/Chat/Groups/interface'

type BarArgs<T> = { data: T }

const uid = storage.get('react_im_user_id')
const bar = {
    del: ({ data }: BarArgs<GroupsDelMessage>) => <p className="im-m-r-c-tip">{data.text}</p>,
    patted: ({ data }: BarArgs<PattedMessage>) => (
        <p className="im-m-r-c-tip">
            {data.before.id === uid
                ? `我${data.way}${data.after.nickname}${data.after.text ? `的${data.after.text}` : ''}`
                : `${data.before.nickname}${data.way}${data.after.id === uid ? '我' : data.after.nickname}${
                      data.after.text ? `的${data.after.text}` : ''
                  }`}
        </p>
    )
}

const RenderSingleMsg: FC<RenderSingleMsgType<GroupsMessage & RenderSingleGroupsMsg>> = (props) => {
    const { id, idx, avatar, nickname, role, time } = props
    const isSelf = uid === id
    return (
        <li>
            {!timeUtils.isTime(time, idx) ? <p className="im-m-r-c-tip">{timeUtils.getTime(time).all}</p> : null}
            {(bar as any)[props.type] ? (
                (bar as any)[props.type]({ isSelf, data: props.data })
            ) : (
                <div className={`im-m-r-c-msg ${isSelf ? 'im-m-r-c-msg-self' : 'im-m-r-c-msg-other'}`}>
                    <Link to={`/intro/${id}`}>
                        <p className="im-m-r-c-m-avatar">
                            <img src={avatar} />
                        </p>
                    </Link>
                    <div className="im-m-r-c-m-row">
                        <div
                            className={`im-m-r-c-m-r-c-title ${
                                isSelf ? 'im-m-r-c-m-r-c-title-self' : 'im-m-r-c-m-r-c-title-other'
                            }`}>
                            <GroupRole role={role} />
                            <span className="im-m-r-c-m-r-c-t-name">{nickname}</span>
                        </div>
                        <TextMsg isSelf={isSelf} {...props} />
                    </div>
                </div>
            )}
        </li>
    )
}

export default RenderSingleMsg
