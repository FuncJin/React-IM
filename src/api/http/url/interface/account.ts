/** 账号类型(用户id、群聊id、空id) */
export type AccountType = 'uid' | 'gid' | 'noid'
/** 账号类型(用户id、群聊id) */
export type AccountRegType = 'uid' | 'gid'

/** 每个账号(用户、群聊)都必有的基础信息 */
export type EveryAccountBasisInfo = {
    id: string
    nickname: string
    avatar: string
}

/** 登录或注册成功时返回的数据 */
export type AccountReturnInfo = {
    token: string
    nickname: string
    avatar: string
    background: string
}
