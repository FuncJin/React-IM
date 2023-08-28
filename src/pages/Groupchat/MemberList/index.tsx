import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'

import GroupchatRoleIcon from '@components/Groupchat/RoleIcon'
import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'

import { storage } from '@utils/storage'

import { getGroupchatMemberByRole } from '@api/http/url/get/list/groupchatRole'

import type { GroupchatPersonInfo } from '@api/http/url/get/list/groupchatRole/interface'

const uid = storage.get('react_im_user_id')

/** 群成员列表（包含群主、管理员、普通成员） */
const MemberList = () => {
    // 群聊成员信息
    const [member, setMember] = useState<GroupchatPersonInfo>({ totals: 0, info: [] })
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const gid = pathname.split('/')[3]
    useEffect(() => {
        getGroupchatMemberByRole({ id: gid, type: 'all' })({
            succeed: { func: (groupchat) => setMember(groupchat) },
            failed: { func: () => message({ title: '成员列表获取失败' }) }
        })
    }, [])
    const memberList = useMemo(
        () =>
            member.info.map((groups, idx) => (
                <CommonRow
                    key={idx}
                    title={groups.title}
                    list={
                        groups.list.length
                            ? groups.list.map(({ id, avatar, nickname, role }) => ({
                                  icon: <img className="im-img-avatar-radius" src={avatar} />,
                                  text: (
                                      <span>
                                          <GroupchatRoleIcon role={role} />
                                          {nickname}
                                      </span>
                                  ),
                                  more: id !== uid,
                                  click: id === uid ? () => {} : () => navigate(`/groupchat/memberList/${gid}/${id}`)
                              }))
                            : [{ text: '席位暂时为空~', more: false }]
                    }
                />
            )),
        [member.info]
    )
    return (
        <Sideslip title="成员列表">
            {memberList}
            <CommonRow
                title={
                    member.totals ? (
                        `当前群聊共有成员${member.totals}人。`
                    ) : (
                        <span>
                            正在获取群聊成员，请稍后&nbsp;&nbsp;
                            <LoadingOutlined />
                        </span>
                    )
                }
            />
        </Sideslip>
    )
}

export default MemberList
