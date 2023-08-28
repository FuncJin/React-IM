import { Link } from 'react-router-dom'

import TextMsg from './TextMsg'

import { timeUtils } from '@utils/time'
import { storage } from '@utils/storage'

import type { FC } from 'react'

import type { PrivateMessage } from '@api/http/url/get/message/friend/interface'
import type { PattedMessage } from '@api/http/url/get/message/interface'
import type { RenderSingleMsg as RenderSingleMsgType } from '@pages/Room/Chat/interface'
import type { RenderSinglePrivateMsg } from '@pages/Room/Chat/Private/interface'

type BarArgs<T> = {
    isSelf: boolean
    data: T
}

const uid = storage.get('react_im_user_id')
const bar = {
    del: ({ isSelf, data }: BarArgs<string>) => (
        <p className="im-m-r-c-tip">
            {isSelf ? '你' : '对方'}撤回了一条消息{data !== '无' ? `，${data}` : ''}
        </p>
    ),
    patted: ({ data }: BarArgs<PattedMessage>) => (
        <p className="im-m-r-c-tip">
            {data.before.id === uid
                ? `我${data.way}${data.after.nickname}${data.after.text ? `的${data.after.text}` : ''}`
                : `${data.before.alias ? data.before.alias : data.before.nickname}${data.way}我${
                      data.after.text ? `的${data.after.text}` : ''
                  }`}
        </p>
    )
}

/** 渲染单条消息 */
const RenderSingleMsg: FC<RenderSingleMsgType<PrivateMessage & RenderSinglePrivateMsg>> = (props) => {
    const isSelf = uid === props.id
    return (
        <li>
            {!timeUtils.isTime(props.time, props.idx) ? (
                <p className="im-m-r-c-tip">{timeUtils.getTime(props.time).all}</p>
            ) : null}
            {(bar as any)[props.type] ? (
                (bar as any)[props.type]({ isSelf, data: props.data })
            ) : (
                <div className={`im-m-r-c-msg ${isSelf ? 'im-m-r-c-msg-self' : 'im-m-r-c-msg-other'}`}>
                    <Link to={`/intro/${props.id}`}>
                        <p className="im-m-r-c-m-avatar">
                            <img src={props.avatar} />
                        </p>
                    </Link>
                    <div className="im-m-r-c-m-row">
                        <TextMsg isSelf={isSelf} {...props} />
                    </div>
                </div>
            )}
        </li>
    )
}

export default RenderSingleMsg
