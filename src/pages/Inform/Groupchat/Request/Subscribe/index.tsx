import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'antd'

import { message } from '@components/Message'
import Slot from '@components/Slot'
import TourAxios from '@components/TourAxios'

import { timeUtils } from '@utils/time'

import { handleGroupchatRequestHttpApi } from '@api/http/url/set/request/groupchat'

import type { FC } from 'react'

import type { SubType, ReqType, RequestApi } from './interface'

/** 发起处理群聊申请的请求 */
const requestApi: RequestApi = (req, state, updateRequest) =>
    new Promise((r) => {
        handleGroupchatRequestHttpApi.api({
            id: req.groupchat.id,
            requester: req.requester.id,
            state
        })({
            succeed: {
                func: async () => {
                    await updateRequest()
                    r(true)
                    message({
                        title: state
                            ? `已同意${req.requester.nickname}加入群${req.groupchat.nickname}`
                            : `已拒绝${req.requester.nickname}的入群申请`
                    })
                }
            },
            failed: {
                func: () => {
                    r(false)
                    message({ title: `${state ? '同意' : '拒绝'}群聊申请失败` })
                }
            }
        })
    })

/** 等待验证状态下的操作 */
const Waitting: FC<ReqType> = ({ req, updateRequest }) => {
    const [disabled, setDisabled] = useState(false)
    return (
        <div className="im-p-i-l-options">
            <Button size="small" disabled={disabled}>
                <TourAxios
                    name={handleGroupchatRequestHttpApi.url}
                    disabled="处理群聊申请"
                    api={() => {
                        setDisabled(true)
                        return requestApi(req, 0, updateRequest)
                    }}
                    after={{ end: () => setDisabled(false) }}
                    loading={{ children: '拒绝中' }}>
                    拒绝
                </TourAxios>
            </Button>
            <Button size="small" disabled={disabled}>
                <TourAxios
                    name={handleGroupchatRequestHttpApi.url}
                    disabled="处理群聊申请"
                    api={() => {
                        setDisabled(true)
                        return requestApi(req, 1, updateRequest)
                    }}
                    after={{ end: () => setDisabled(false) }}
                    loading={{ children: '同意中' }}>
                    同意
                </TourAxios>
            </Button>
        </div>
    )
}
const Agree: FC<ReqType> = ({ req }) => (
    <span className="im-p-i-l-result im-p-i-l-other-result">
        <Link to={`/intro/${req.handler.id}`} className="im-p-i-l-request-nickname">
            {req.handler.nickname}
        </Link>
        已同意
    </span>
)
const Refuse: FC<ReqType> = ({ req }) => (
    <span className="im-p-i-l-result im-p-i-l-self-result">
        <Link to={`/intro/${req.handler.id}`} className="im-p-i-l-request-nickname">
            {req.handler.nickname}
        </Link>
        已拒绝
    </span>
)

const requestState = {
    waitting: Waitting,
    agree: Agree,
    refuse: Refuse
}

/** 收到的群聊申请 */
const Subscribe: FC<SubType> = ({ subscribe, updateRequest }) => (
    <ul>
        {subscribe.map((req, index) => (
            <li className="im-panel-informs-list" key={index}>
                <p className="im-p-i-l-details">
                    <Link to={`/intro/${req.requester.id}`} className="im-p-i-l-request-nickname">
                        {req.requester.nickname}
                    </Link>
                    在<time>{timeUtils.getTime(req.time).all}</time>向
                    <Link to={`/intro/${req.groupchat.id}`} className="im-p-i-l-request-nickname">
                        {req.groupchat.nickname}({req.groupchat.id})
                    </Link>
                    发出了群聊申请
                </p>
                <p className="im-p-i-l-msg">验证消息：{req.msg}</p>
                <Slot req={req} updateRequest={updateRequest}>
                    {requestState[req.state]}
                </Slot>
            </li>
        ))}
    </ul>
)

export default Subscribe
