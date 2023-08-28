import { useState, useEffect } from 'react'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'

import { getSystemConfigsHttpApi } from '@api/http/url/get/system/defaultConfigs'
import { getFriendsCircleRoleHttpApi } from '@api/http/url/get/friendsCircle/role'
import { setFriendsCircleRoleHttpApi } from '@api/http/url/set/account/friendsCircle/role'

import type { CommonRowListType } from '@components/CommonRow/interface'

type ConfigType = keyof typeof bar

const bar = {
    public: '所有人可见',
    private: '仅自己可见',
    friend: '仅好友可见'
}

const uid = storage.get('react_im_user_id')

/** 朋友圈权限 */
const Role = () => {
    // 当前选中的编号
    const [num, setNum] = useState(-1)
    // 平台默认的朋友圈权限列表
    const [role, setRole] = useState<CommonRowListType[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    // 某个选项的加载动画
    const [opLoading, setOpLoading] = useState(true)
    /** 单击某一选项时触发 */
    const click = useEventCallback((idx: number, text: string) => {
        if (opLoading || idx === num) return
        const _role = [...role]
        setNum(idx)
        setOpLoading(true)
        // 为当前选中的选项开启加载动画
        setRole(role.map((op, order) => (order !== idx ? op : { ...op, isLoading: true })))
        setFriendsCircleRoleHttpApi(idx)({
            failed: {
                func: () => {
                    setNum(num)
                    message({ title: '更改失败，请重试' })
                }
            },
            finally: () => {
                setOpLoading(false)
                setRole(_role)
            }
        })
    })
    useEffect(() => {
        Promise.all([getFriendsCircleRoleHttpApi(uid)(), getSystemConfigsHttpApi.friendsCircle.role()()]).then(
            ([curRole, config]) => {
                const _role = config.data.map((text: ConfigType, idx: number) => {
                    // 找出当前正在使用的权限
                    if (curRole.data === text) setNum(idx)
                    const _text = bar[text]
                    // 渲染默认项
                    return { text: _text, click: () => click(idx, _text) }
                })
                setRole(_role)
                setLoading(false)
                setOpLoading(false)
            }
        )
    }, [])
    return (
        <Sideslip title="权限设置" isLoading={loading}>
            <CommonRow title="我的朋友圈对谁开放？" list={role} selected={num} />
        </Sideslip>
    )
}

export default Role
