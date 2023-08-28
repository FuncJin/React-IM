import { getGradeJudgeByGroupchatRoleHttpApi } from '@api/http/url/get/groupchat/roleGradeJudge'

import type { MapId } from '@interface/type'

/**
 * 群聊等级关系判断
 * - 返回true的情况：
 *   1. uid为群主，且uid的账号不等于oid的账号。
 *   2. uid为管理员，且oid为普通成员
 * - 其它所有情况，全部返回false。（注意，如果传入的两个用户id相等，则也会返回false）
 */
export const isTrueByGroupchatRoleGrade = (id: MapId<'uid' | 'oid' | 'gid'>) =>
    new Promise<boolean>((r) =>
        getGradeJudgeByGroupchatRoleHttpApi(id)({
            succeed: { func: (relation) => r(relation) },
            failed: { func: () => r(false) }
        })
    )
