import { Fragment, memo } from 'react'

import Slot from '@components/Slot'

import type { FC } from 'react'

import type { CalcRoleRelationType } from './interface'

/** 群主 */
const Host: FC<CalcRoleRelationType> = ({ other, hostToHost, hostToAdmins, hostToCommons }) => {
    const role = {
        host: hostToHost,
        admins: hostToAdmins,
        commons: hostToCommons
    }
    return <Fragment key="0">{role[other]}</Fragment>
}
/** 管理员 */
const Admins: FC<CalcRoleRelationType> = ({ other, adminsToHost, adminsToAdmins, adminsToCommons }) => {
    const role = {
        host: adminsToHost,
        admins: adminsToAdmins,
        commons: adminsToCommons
    }
    return <Fragment key="0">{role[other]}</Fragment>
}
/** 普通成员 */
const Commons: FC<CalcRoleRelationType> = ({ other, commonsToHost, commonsToAdmins, commonsToCommons }) => {
    const role = {
        host: commonsToHost,
        admins: commonsToAdmins,
        commons: commonsToCommons
    }
    return <Fragment key="0">{role[other]}</Fragment>
}

/**
 * 根据双方关系得到群聊角色的关系
 *  - host:
 *    - 自身是host，对方是admins时渲染hostToAdmins;
 *    - 自身是host，对方是commons时渲染hostToCommons;
 *  - admins:
 *    - 自身是admins，对方是host时渲染adminsToHost;
 *    - 自身是admins，对方是admins时渲染adminsToAdmins;
 *    - 自身是admins，对方是commons时渲染adminsToCommons;
 *  - commons:
 *    - 自身是commons，对方是admins时渲染commonsToAdmins;
 *    - 自身是commons，对方是commons时渲染commonsToCommons;
 *    - 自身是commons，对方是host时渲染commonsToHost;
 */
const CalcRoleRelation: FC<CalcRoleRelationType> = (props) => {
    const role = {
        host: Host,
        admins: Admins,
        commons: Commons
    }
    return <Slot {...props}>{role[props.self]}</Slot>
}

export default memo(CalcRoleRelation)
