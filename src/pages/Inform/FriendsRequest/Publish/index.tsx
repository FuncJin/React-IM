import { Link } from 'react-router-dom'

import Slot from '@components/Slot'

import { timeUtils } from '@utils/time'

import type { FC } from 'react'

import type { PubType } from './interface'

const Waitting = () => <span className="im-p-i-l-result im-p-i-l-waitting">等待验证</span>
const Agree = () => <span className="im-p-i-l-result im-p-i-l-other-result">对方已同意</span>
const Refuse = () => <span className="im-p-i-l-result im-p-i-l-self-result">对方已拒绝</span>

const requestState = {
    waitting: Waitting,
    agree: Agree,
    refuse: Refuse
}

/** 发出的好友申请 */
const Publish: FC<PubType> = ({ publish }) => (
    <ul>
        {publish.map((req, idx) => (
            <li className="im-panel-informs-list" key={idx}>
                <p className="im-p-i-l-details">
                    你在<time>{timeUtils.getTime(req.time).all}</time>向
                    <Link to={`/intro/${req.id}`} className="im-p-i-l-request-nickname">
                        {req.nickname}
                    </Link>
                    发出了好友申请
                </p>
                <p className="im-p-i-l-msg">{req.msg ? `我发送的验证消息：${req.msg}` : '未发送验证消息至对方'}</p>
                <Slot>{requestState[req.state]}</Slot>
            </li>
        ))}
    </ul>
)

export default Publish
