import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'
import Sideslip from '@components/Sideslip'

import { setPositionByFriendGroupsHttpApi } from '@api/http/url/set/friendGroups/position'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getGroupsListNameHttpApi } from '@api/http/url/get/friend/groupsListName'
import { getCurGroupsNameHttpApi } from '@api/http/url/get/friend/curGroupsName'

/** 修改好友分组 */
const ChangeGroup = () => {
    // 对方昵称
    const [nickname, setNickname] = useState('')
    // 对方所在的原分组
    const [preGroupsName, setPreGroupsName] = useState('')
    // 当前用户的好友列表分组名称
    const [friendList, setFriendList] = useState([] as string[])
    // 新分组
    const [nextGroupsName, setNextGroupsName] = useState('')
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    useEffect(() => {
        getNicknameHttpApi(id)({ succeed: { func: (nickname) => setNickname(nickname) } })
        getGroupsListNameHttpApi()({
            succeed: {
                func: (groups) => {
                    setFriendList(groups)
                    getCurGroupsNameHttpApi(id)({
                        succeed: {
                            func: (name) => {
                                setNextGroupsName(name)
                                setPreGroupsName(name)
                            }
                        }
                    })
                }
            }
        })
    }, [])
    /** 请求前对格式进行检查 */
    const before = () =>
        nextGroupsName === preGroupsName ? message({ title: `${nickname}已经在[${preGroupsName}]分组中了` }) : true
    const change = () =>
        setPositionByFriendGroupsHttpApi.api({ id, groups: nextGroupsName })({
            succeed: {
                func: () => {
                    setPreGroupsName(nextGroupsName)
                    message({ title: `已将${nickname}移动至[${nextGroupsName}]分组` })
                }
            },
            failed: { func: () => message({ title: '分组修改失败' }) }
        })
    return (
        <Sideslip title="设置分组" isLoading={!preGroupsName}>
            <CommonRow
                title="选择要调整到的新分组"
                list={friendList.map((text) => ({ text, click: () => setNextGroupsName(text) }))}
                selected={friendList.findIndex((name) => name === nextGroupsName)}
            />
            <CommonRow
                list={[
                    {
                        text: (
                            <TourAxios
                                name={setPositionByFriendGroupsHttpApi.url}
                                disabled="修改分组"
                                before={before}
                                api={change}
                                loading={{ children: '修改中' }}>
                                完成
                            </TourAxios>
                        ),
                        primaryColor: true
                    }
                ]}
            />
        </Sideslip>
    )
}

export default ChangeGroup
