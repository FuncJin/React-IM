import type { EveryAccountBasisInfo } from './account'

/** 群成员的角色权限(群主、管理员、普通成员) */
export type GroupchatRole = 'host' | 'admins' | 'commons'
/** 群成员的类型(根据权限来划分的类型，即全部、仅管理员、仅普通成员) */
export type GroupchatMemberRoleList = 'all' | 'admins' | 'commons'

/** 群聊的基本信息 */
export type GroupChatBasisInfo = EveryAccountBasisInfo & { signature: string }
