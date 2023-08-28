import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import CalcRoleRelation from '@components/Groupchat/CalcRoleRelation'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { delGroupchatAdminHttpApi } from '@api/http/url/del/groupchat/admin'
import { kickGroupchatMemberHttpApi } from '@api/http/url/del/groupchat/member'
import { addGroupchatAdminHttpApi } from '@api/http/url/add/groupchat/admin'
import { getGroupchatBanTimeHttpApi } from '@api/http/url/get/groupchat/banTime'
import { getGroupchatRoleHttpApi } from '@api/http/url/get/groupchat/role'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getGroupchatAssignRoleByUserHttpApi } from '@api/http/url/get/groupchat/assignRoleByUser'

import type { GroupchatRole } from '@api/http/url/interface/groupchat'

/** 根据群聊关系展示不同的操作 */
const ShowActionByRelations = () => {
    const [loading, setLoading] = useState(true)
    // 是否已经被禁言了
    const [isBan, setIsBan] = useState(0)
    // 当前成员(自己)在该群中的角色
    const [selfRole, setSelfRole] = useState<GroupchatRole>('commons')
    // 当前成员(对方)在该群中的角色
    const [otherRole, setOtherRole] = useState<GroupchatRole>('commons')
    // 当前成员的昵称
    const [nickname, setNickname] = useState('')
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [, , , gid, oid] = pathname.split('/')
    /** 取消管理员 */
    const delAdminApi = () =>
        delGroupchatAdminHttpApi.api({ gid, oid })({
            succeed: {
                func: async () => {
                    await getAssignRoleByUser()
                    message({ title: `已取消${nickname}(${oid})的管理员身份` })
                }
            },
            failed: { func: () => message({ title: '取消失败，请重试' }) }
        })
    /** 设为管理员 */
    const addAdminApi = () =>
        addGroupchatAdminHttpApi.api({ gid, oid })({
            succeed: {
                func: async () => {
                    await getAssignRoleByUser()
                    message({ title: `已将${nickname}(${oid})设为管理员` })
                }
            },
            failed: { func: () => message({ title: '设置失败，请重试' }) }
        })
    /** 踢出群聊 */
    const kickApi = () =>
        kickGroupchatMemberHttpApi.api({ gid, oid })({
            succeed: {
                func: () => {
                    message({ title: `已将${nickname}(${oid})踢出群聊` })
                    navigate(-1)
                }
            },
            failed: { func: () => message({ title: '踢出失败，请重试' }) }
        })
    const getAssignRoleByUser = () =>
        getGroupchatAssignRoleByUserHttpApi({ gid, oid })({ succeed: { func: (role) => setOtherRole(role) } })
    // 禁言或解除禁言
    useEffect(() => {
        getGroupchatRoleHttpApi(gid)({ succeed: { func: (role) => setSelfRole(role) } })
        getGroupchatBanTimeHttpApi({ gid, oid })({
            succeed: { func: (dur) => setIsBan(dur) },
            failed: { func: () => message({ title: '禁言时间获取失败' }) },
            finally: () => setLoading(false)
        })
        getNicknameHttpApi(oid)({ succeed: { func: (nickname) => setNickname(nickname) } })
        getAssignRoleByUser()
    }, [])
    const banList = {
        text: '设置禁言时长',
        description: isBan ? '禁言中' : '',
        to: { pathname: `/groupchat/memberList/${gid}/${oid}/ban` },
        more: true
    }
    const kickList = {
        text: (
            <TourAxios
                name={kickGroupchatMemberHttpApi.url}
                disabled="踢出群聊"
                api={kickApi}
                loading={{ children: '正在踢出' }}>
                踢出群聊
            </TourAxios>
        ),
        description: '谨慎操作'
    }
    const addAdminList = {
        text: (
            <TourAxios
                name={addGroupchatAdminHttpApi.url}
                disabled="添加管理员"
                api={addAdminApi}
                loading={{ children: '处理中' }}>
                设为管理
            </TourAxios>
        ),
        description: '谨慎操作'
    }
    const cancelAdminList = {
        text: (
            <TourAxios
                name={delGroupchatAdminHttpApi.url}
                disabled="取消管理员"
                api={delAdminApi}
                loading={{ children: '取消中' }}>
                取消管理
            </TourAxios>
        ),
        description: '谨慎操作'
    }
    return (
        <Sideslip title={`${nickname}(${oid})`} isLoading={loading}>
            <CalcRoleRelation
                self={selfRole}
                other={otherRole}
                hostToAdmins={<CommonRow title="成员操作" list={[banList, cancelAdminList, kickList]} />}
                hostToCommons={<CommonRow title="成员操作" list={[banList, addAdminList, kickList]} />}
                adminsToCommons={<CommonRow title="成员操作" list={[banList, kickList]} />}
            />
            <CommonRow list={[{ text: 'Ta的个人主页', to: { pathname: `/intro/${oid}` }, more: true }]} />
        </Sideslip>
    )
}

export default ShowActionByRelations
