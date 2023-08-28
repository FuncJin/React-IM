import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'

import { getIdTypeHttpApi } from '@api/http/url/account/type/id'

/** 搜索(id) */
const Search = () => {
    // 要查找的id
    const [id, setId] = useState('')
    const navigate = useNavigate()
    /** 搜索前对id的格式进行检查 */
    const before = useEventCallback(() => (appRules.specific.id(id) ? true : message({ title: 'ID不符合规则' })))
    /** 发送搜索id的请求(检查当前id是什么类型) */
    const search = useEventCallback(() =>
        getIdTypeHttpApi(id)({
            succeed: {
                func: (types) => {
                    // 符合规则时直接跳往主页
                    if (types !== 'noid') return navigate(`/intro/${id}`)
                    message({
                        title: '当前查找结果',
                        Children: (
                            <span>
                                <del>{id}</del>是空ID或已注销ID
                            </span>
                        )
                    })
                }
            },
            failed: { func: () => message({ title: '搜索时出错' }) }
        })
    )
    const contentList = useMemo(
        () => [
            {
                text: (
                    <Input
                        bordered={false}
                        value={id}
                        onChange={(el) => setId(el.target.value)}
                        placeholder="ID"
                        size="small"
                        maxLength={6}
                    />
                )
            }
        ],
        [id]
    )
    const searchList = useMemo(
        () => [
            {
                text: (
                    <TourAxios before={before} api={search} loading={{ children: '查找中' }}>
                        查找
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="查找好友或群聊">
            <CommonRow list={contentList} comment="输入要查找的用户或群聊ID" />
            <CommonRow list={searchList} comment="若查找成功，则直接跳转至主页" />
            <CommonRow title="tip: 以下是官方账号哦~" comment="开发者账号：1000 ； 官方交流群账号：100000" />
        </Sideslip>
    )
}

export default Search
