import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { Input } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'
import Sideslip from '@components/Sideslip'

import { useEventCallback } from '@hooks'

import { setFriendAliasHttpApi } from '@api/http/url/set/friend/alias'
import { getAliasHttpApi } from '@api/http/url/get/nickname/alias'

/** 修改好友备注 */
const ChangeAlias = () => {
    // 原备注
    const [preAlias, setPreAlias] = useState('')
    // 新备注
    const [newAlias, setNewAlias] = useState('')
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    useEffect(() => {
        getAliasHttpApi(id)({
            succeed: {
                func: (alias) => {
                    setPreAlias(alias)
                    // 将新备注填充为原备注
                    setNewAlias(alias)
                }
            },
            failed: { func: () => message({ title: '备注获取失败' }) }
        })
    }, [])
    /** 请求前对格式进行检查 */
    const before = useEventCallback(() => {
        if (newAlias === preAlias) return message({ title: '新旧备注不能相同' })
        if (newAlias.length > 7)
            return message({
                title: '你输入的内容过长，不能超过7个字符',
                options: [{ text: '我知道了' }],
                Children: `已超过${newAlias.length - 7}字符`
            })
        return true
    })
    const change = useEventCallback(() =>
        setFriendAliasHttpApi.api({ id, alias: newAlias })({
            succeed: {
                func: () => {
                    setPreAlias(newAlias)
                    message({ title: newAlias.length ? '修改成功' : '已清空备注' })
                }
            },
            failed: { func: () => message({ title: '修改失败' }) }
        })
    )
    const aliasList = useMemo(
        () => [
            {
                text: (
                    <Input
                        bordered={false}
                        value={newAlias}
                        onChange={(ev) => setNewAlias(ev.target.value)}
                        maxLength={7}
                    />
                )
            }
        ],
        [newAlias]
    )
    const changeList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={setFriendAliasHttpApi.url}
                        disabled="修改备注"
                        before={before}
                        api={change}
                        loading={{ children: '修改中' }}>
                        完成
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="设置备注" isLoading={!preAlias}>
            <CommonRow title="新备注" list={aliasList} />
            <CommonRow list={changeList} />
        </Sideslip>
    )
}

export default ChangeAlias
