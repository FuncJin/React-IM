import { Link } from 'react-router-dom'

import Slot from '@components/Slot'

import { timeUtils } from '@utils/time'

import type { FC } from 'react'

import type { PubType, UserInfoNameType } from './interface'

const Waitting = () => <span className="im-p-i-l-result im-p-i-l-waitting">等待群管理人员审核</span>
const Agree: FC<UserInfoNameType> = ({ id, nickname }) => (
    <span className="im-p-i-l-result im-p-i-l-other-result">
        <Link to={`/intro/${id}`} className="im-p-i-l-request-nickname">
            {nickname}
        </Link>
        已同意
    </span>
)
const Refuse: FC<UserInfoNameType> = ({ id, nickname }) => (
    <span className="im-p-i-l-result im-p-i-l-self-result">
        <Link to={`/intro/${id}`} className="im-p-i-l-self-result">
            {nickname}
        </Link>
        已拒绝
    </span>
)

const requestState = {
    waitting: Waitting,
    agree: Agree,
    refuse: Refuse
}

/** 发出的群聊申请 */
const Publish: FC<PubType> = ({ publish }) => (
    <ul>
        {publish.map((req, index) => (
            <li className="im-panel-informs-list" key={index}>
                <p className="im-p-i-l-details">
                    你在<time>{timeUtils.getTime(req.time).all}</time>向
                    <Link to={`/intro/${req.groupchat.id}`} className="im-p-i-l-request-nickname">
                        {req.groupchat.nickname}({req.groupchat.id})
                    </Link>
                    发出了群聊申请
                </p>
                <p className="im-p-i-l-msg">我发送的验证消息：{req.msg}</p>
                <Slot id={req.handler.id} nickname={req.handler.nickname}>
                    {requestState[req.state]}
                </Slot>
            </li>
        ))}
    </ul>
)

export default Publish
