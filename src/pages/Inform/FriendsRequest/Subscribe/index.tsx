import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'antd'

import { message } from '@components/Message'
import Slot from '@components/Slot'
import TourAxios from '@components/TourAxios'

import { timeUtils } from '@utils/time'

import { handleFriendRequestHttpApi } from '@api/http/url/set/request/friend'

import type { FC } from 'react'

import type { SubType, WaittingType } from './interface'

/** 发送同意或拒绝好友申请的请求 */
const requestApi = ({ oid, oname, state, updateRequest }: WaittingType & { state: 0 | 1 }) =>
    new Promise((r) => {
        handleFriendRequestHttpApi.api({ id: oid, state })({
            succeed: {
                func: async () => {
                    await updateRequest()
                    r(true)
                    message({ title: state ? `已与${oname}成为好友` : `已拒绝${oname}的好友申请` })
                }
            },
            failed: {
                func: () => {
                    r(false)
                    message({ title: '处理失败，请重试' })
                }
            }
        })
    })

/** 等待验证状态下可进行的操作 */
const Waitting: FC<WaittingType> = ({ oid, oname, updateRequest }) => {
    const [disabled, setDisabled] = useState(false)
    return (
        <div className="im-p-i-l-options">
            <Button size="small" disabled={disabled}>
                <TourAxios
                    name={handleFriendRequestHttpApi.url}
                    disabled="处理好友申请"
                    api={() => {
                        setDisabled(true)
                        return requestApi({ oid, oname, state: 0, updateRequest })
                    }}
                    after={{ end: () => setDisabled(false) }}
                    loading={{ children: '拒绝中' }}>
                    拒绝
                </TourAxios>
            </Button>
            <Button size="small" disabled={disabled}>
                <TourAxios
                    name={handleFriendRequestHttpApi.url}
                    disabled="处理好友申请"
                    api={() => {
                        setDisabled(true)
                        return requestApi({ oid, oname, state: 1, updateRequest })
                    }}
                    after={{ end: () => setDisabled(false) }}
                    loading={{ children: '同意中' }}>
                    同意
                </TourAxios>
            </Button>
        </div>
    )
}
const Agree = () => <span className="im-p-i-l-result im-p-i-l-other-result">你已同意</span>
const Refuse = () => <span className="im-p-i-l-result im-p-i-l-self-result">你已拒绝</span>

const requestState = {
    waitting: Waitting,
    agree: Agree,
    refuse: Refuse
}

/** 收到的好友申请 */
const Subscribe: FC<SubType> = ({ subscribe, updateRequest }) => (
    <ul>
        {subscribe.map((req, index) => (
            <li className="im-panel-informs-list" key={index}>
                <p className="im-p-i-l-details">
                    <Link to={`/intro/${req.id}`} className="im-p-i-l-request-nickname">
                        {req.nickname}
                    </Link>
                    在<time>{timeUtils.getTime(req.time).all}</time>向你发出了好友申请
                </p>
                <p className="im-p-i-l-msg">{req.msg ? `验证消息：${req.msg}` : '对方未发送验证消息'}</p>
                <Slot oid={req.id} oname={req.nickname} updateRequest={updateRequest}>
                    {requestState[req.state]}
                </Slot>
            </li>
        ))}
    </ul>
)

export default Subscribe
