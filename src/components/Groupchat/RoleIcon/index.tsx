import type { FC } from 'react'

import type { RoleIconType } from './interface'

import './index.less'

const bar = {
    host: <span className="im-groupcha-role-icon im-g-r-i-host">群主</span>,
    admins: <span className="im-groupcha-role-icon im-g-r-i-admin">管理员</span>,
    commons: null
}

/** 群聊中各角色的图标 */
const RoleIcon: FC<RoleIconType> = ({ role }) => bar[role]

export default RoleIcon
