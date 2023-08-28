import { Link } from 'react-router-dom'

import { timeUtils } from '@utils/time'

import type { FC } from 'react'

import type { InformBodyType } from './interface'

/** 每条通知的内容块 */
const InformBody: FC<InformBodyType> = ({ row, informText }) => (
    <>
        <div className="im-p-fc-i-l-header">
            <div className="im-p-fc-i-l-h-avatar">
                <img src={row.avatar} />
            </div>
            <div>
                <Link to={`/intro/${row.id}`}>{row.nickname}</Link>
                <div>
                    <span className="im-p-fc-i-l-h-time">{timeUtils.getTime(row.time).all}</span>
                    <span className="im-p-fc-i-l-h-action">{informText}</span>
                </div>
            </div>
        </div>
        <p className="im-p-fc-i-l-reference">{row.content}</p>
        <p className="im-p-fc-i-l-body">：{row.body}</p>
    </>
)

export default InformBody
