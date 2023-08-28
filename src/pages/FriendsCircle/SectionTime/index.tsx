import { useState, useEffect } from 'react'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { useEventCallback } from '@hooks'

import { timeUtils } from '@utils/time'
import { storage } from '@utils/storage'

import { getSystemConfigsHttpApi } from '@api/http/url/get/system/defaultConfigs'
import { getFriendsCircleSectionTimeHttpApi } from '@api/http/url/get/friendsCircle/sectionTime'
import { setFriendsCircleSectionTimeHttpApi } from '@api/http/url/set/account/friendsCircle/time'

import type { CommonRowListType } from '@components/CommonRow/interface'

const uid = storage.get('react_im_user_id')
const allTimeSection = (timestamp: number) => (timestamp ? `${timestamp}天内可见` : '全部可见')

/** 朋友圈的可见时间范围 */
const SectionTime = () => {
    // 当前选中的编号
    const [num, setNum] = useState(-1)
    // 平台默认的可见时间列表
    const [time, setTime] = useState<CommonRowListType[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    // 某个选项的加载动画
    const [opLoading, setOpLoading] = useState(true)
    /** 切换选项时触发 */
    const click = useEventCallback((idx: number, text: string) => {
        if (opLoading || idx === num) return
        const _time = [...time]
        setNum(idx)
        setOpLoading(true)
        // 为当前选项开启加载动画
        setTime(time.map((op, order) => (order !== idx ? op : { ...op, isLoading: true })))
        setFriendsCircleSectionTimeHttpApi(idx)({
            failed: {
                func: () => {
                    setNum(num)
                    message({ title: '更改失败，请重试' })
                }
            },
            finally: () => {
                setOpLoading(false)
                setTime(_time)
            }
        })
    })
    useEffect(() => {
        Promise.all([getFriendsCircleSectionTimeHttpApi(uid)(), getSystemConfigsHttpApi.friendsCircle.time()()]).then(
            ([curTime, config]) => {
                const _time = config.data.map((time: number, idx: number) => {
                    // 找出当前正在使用的可见时间范围
                    if (curTime.data === time) setNum(idx)
                    const _time = allTimeSection(timeUtils.getDaysTimeSection(time))
                    // 渲染默认项
                    return { text: _time, click: () => click(idx, _time) }
                })
                setTime(_time)
                setLoading(false)
                setOpLoading(false)
            }
        )
    }, [])
    return (
        <Sideslip title="可见范围" isLoading={loading}>
            <CommonRow title="可查看的朋友圈说说时间" list={time} selected={num} />
        </Sideslip>
    )
}

export default SectionTime
