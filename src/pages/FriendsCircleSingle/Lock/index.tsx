import type { FC } from 'react'

import type { LockType } from './interface'

import './index.less'

/** 不可查看对方朋友圈时 */
const Lock: FC<LockType> = ({ role }) => (
    <div className="im-panel-friends-circle-single-lock">
        <div className="im-p-fc-s-l-img" />
        <p>不打扰，是彼此的温柔</p>
        <p className="im-p-fc-s-l-role">该朋友圈仅{role}可见（已留下本次来访记录）</p>
    </div>
)

export default Lock
