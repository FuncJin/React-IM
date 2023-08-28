import type { ReactNode } from 'react'

import type { GroupchatRole } from '@api/http/url/interface/groupchat'

export type CalcRoleRelationType = {
    self: GroupchatRole
    other: GroupchatRole

    hostToHost?: ReactNode
    hostToAdmins?: ReactNode
    hostToCommons?: ReactNode

    adminsToHost?: ReactNode
    adminsToAdmins?: ReactNode
    adminsToCommons?: ReactNode

    commonsToHost?: ReactNode
    commonsToAdmins?: ReactNode
    commonsToCommons?: ReactNode
}
