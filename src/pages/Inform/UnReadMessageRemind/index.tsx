import { useState, useEffect } from 'react'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'

import { useEventCallback } from '@hooks'

import { getUnreadSwitchStateHttpApi } from '@api/http/url/get/account/unreadSwitchState'
import { switchUnreadStateHttpApi } from '@api/http/url/set/account/unreadStateSwitch'

/** 未读消息提醒 */
const UnReadMessageRemind = () => {
    /** 切换状态 */
    const switchState = (state: 0 | 1) => {
        return useEventCallback(() => {
            if (opLoading || order === state) return
            const _list = [...list]
            setOrder(state)
            setOpLoading(true)
            // 为该选项开启加载动画
            setList(list.map((op, order) => (order !== state ? op : { ...op, isLoading: true })))
            switchUnreadStateHttpApi(state)({
                failed: {
                    func: () => {
                        setOrder(order)
                        message({ title: '状态更改失败' })
                    }
                },
                finally: () => {
                    setOpLoading(false)
                    setList(_list)
                }
            })
        })
    }
    // 当前用户的未读开关状态
    const [order, setOrder] = useState(-1)
    // 系统提供的默认选项
    const [list, setList] = useState([
        { text: '关闭', click: switchState(0) },
        { text: '开启', click: switchState(1) }
    ])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    // 某个选项的加载动画
    const [opLoading, setOpLoading] = useState(true)
    useEffect(() => {
        getUnreadSwitchStateHttpApi()({
            succeed: { func: (state) => setOrder(state) },
            failed: { func: () => message({ title: '未读消息状态获取失败' }) },
            finally: () => {
                setOpLoading(false)
                setLoading(false)
            }
        })
    }, [])
    return (
        <Sideslip title="消息提醒" isLoading={loading}>
            <CommonRow
                title="是否希望在周末时通过平台自动发送邮件的方式来提醒你本周的未读消息"
                list={list}
                selected={order}
                comment="提醒时间为每周六早10点钟左右"
            />
        </Sideslip>
    )
}

export default UnReadMessageRemind
