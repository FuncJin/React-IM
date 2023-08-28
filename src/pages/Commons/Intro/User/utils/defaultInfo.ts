import type { UserBasisInfo } from './interface'

/** 默认用户信息 */
export const defaultUserInfo: UserBasisInfo = {
    info: {
        id: '',
        nickname: '',
        alias: '',
        groupsName: '',
        birthplace: {
            province: '',
            city: ''
        },
        sex: '男',
        age: 0,
        signature: '',
        avatar: '',
        background: '',
        homeLocation: '',
        rank: 1,
        tags: {}
    },
    type: 'stranger'
}
