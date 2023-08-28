import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from 'antd'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { getGroupsListNameHttpApi } from '@api/http/url/get/friend/groupsListName'
import { setFriendGroupsNameHttpApi } from '@api/http/url/set/friendGroups/groupsName'

/** 好友分组管理 */
const ManagementGroups = () => {
    // 用于对下标初始化
    const [len, setLen] = useState(-1)
    // 当前正在操作的分组下标
    const [curSelectedGroup, setCurSelectedGroup] = useState(len)
    // 当前修改的结果(用于本地做一些验证判断)
    const [curResult, setCurResult] = useState<string[]>([])
    // 新建分组的序号(例如：新建分组1、新建分组2)
    const [counts, setCounts] = useState(1)
    // 保存新建分组、修改的新分组的名称
    const [newGroupName, setNewGroupName] = useState(curResult[curSelectedGroup])
    // 修改好友分组(后端处理时会按照step的顺序一步步操作)
    const [stops, setStops] = useState<Array<string[]>>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        getGroupsListNameHttpApi()({
            succeed: {
                func: (data) => {
                    setLen(data.length >= 2 ? 1 : -1)
                    setCurResult(data)
                }
            },
            failed: { func: () => message({ title: '好友分组获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    // 添加分组
    const addGroupsList = (name: string) => {
        setStops([...stops, ['add', name]])
        setCurResult([...curResult, name])
        setCurSelectedGroup(curResult.length)
        setNewGroupName(name)
    }
    const addGroups = useEventCallback(() => {
        if (loading) return
        if (curResult.length >= 7) return message({ title: '分组最多存在7个' })
        setCounts(counts + 1)
        const nextGroupsName = `新建分组${counts}`
        // 新建分组时，不能出现命名冲突
        const isHave = curResult.find((originName) => originName === nextGroupsName)
        // 未发生命名冲突
        if (!isHave) return addGroupsList(nextGroupsName)
        // 发生了命名冲突
        for (let i = 1; i < 7; i++) {
            const name = `新建分组${counts + i}`
            const isHave = curResult.find((originName) => originName === name)
            if (isHave) continue
            addGroupsList(name)
            break
        }
    })
    // 删除分组
    const delGroups = () => {
        setStops([...stops, ['del', curResult[curSelectedGroup]]])
        const nextFriendListName = curResult.filter((name) => curResult[curSelectedGroup] !== name)
        setCurResult(nextFriendListName)
        const nextOrder = nextFriendListName.length - 1
        setCurSelectedGroup(nextOrder ? nextOrder : -1)
        setNewGroupName(nextFriendListName[nextOrder])
    }
    // 确认修改分组名称
    const editGroupsName = () => {
        if (newGroupName === '我的好友') return message({ title: '名称不能与默认分组相同' })
        if (!newGroupName.trim()) return message({ title: '名称不能为空' })
        const isHava = curResult.find((originName) => originName === newGroupName)
        if (isHava) return message({ title: `${newGroupName}分组已存在` })
        setStops([...stops, ['edit', curResult[curSelectedGroup], newGroupName]])
        setCurResult(curResult.map((name) => (name === curResult[curSelectedGroup] ? newGroupName : name)))
    }
    /** 提交前对格式进行检查 */
    const before = useEventCallback(() => (stops.length ? true : message({ title: '你还没有对好友列表做出更改' })))
    // 向后台提交数据
    const submitGroups = useEventCallback(() =>
        setFriendGroupsNameHttpApi.api(stops)({
            succeed: {
                func: () => message({ title: '分组已更新', options: [{ text: '确定', click: () => navigate(-1) }] })
            },
            failed: { func: () => message({ title: '分组更新失败' }) }
        })
    )
    const addList = useMemo(() => [{ text: '添加新分组', click: addGroups }], [])
    const submitList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={setFriendGroupsNameHttpApi.url}
                        disabled="管理好友分组"
                        before={before}
                        api={submitGroups}
                        loading={{ children: '提交中' }}>
                        分组修改完成，点此提交
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="管理分组" isLoading={loading}>
            <CommonRow list={addList} />
            <CommonRow
                selected={curSelectedGroup}
                list={[
                    ...curResult.map((text, order) => ({
                        text,
                        click: () => {
                            if (!order) return
                            setCurSelectedGroup(order)
                            setNewGroupName(curResult[order])
                        }
                    }))
                ]}
                comment="上方选中的分组为当前正在进行操作的分组。“我的好友”为默认分组，不能进行任何操作"
            />
            {curSelectedGroup > 0 ? (
                <>
                    <CommonRow
                        title={`编辑“${curResult[curSelectedGroup]}”分组的名称`}
                        list={[
                            {
                                text: (
                                    <Input
                                        bordered={false}
                                        maxLength={7}
                                        value={newGroupName}
                                        onChange={(ev) => setNewGroupName(ev.target.value)}
                                    />
                                )
                            },
                            { text: '确认此分组名称的修改', click: editGroupsName, primaryColor: true }
                        ]}
                    />
                    <CommonRow
                        list={[{ text: `删除${curResult[curSelectedGroup]}分组`, click: delGroups }]}
                        comment={`删除“${curResult[curSelectedGroup]}”分组后，该分组内的所有好友将自动归入默认分组“我的好友”`}
                    />
                </>
            ) : null}
            <CommonRow list={submitList} />
        </Sideslip>
    )
}

export default ManagementGroups
