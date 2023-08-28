import { useState, useEffect } from 'react'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'

import { getLifeStateHttpApi } from '@api/http/url/get/friend/lifeState'
import { setLifeStateHttpApi } from '@api/http/url/set/account/lifeState'
import { getSystemConfigsHttpApi } from '@api/http/url/get/system/defaultConfigs'

import type { CommonRowListType } from '@components/CommonRow/interface'

const uid = storage.get('react_im_user_id')

/** 生活状态 */
const LifeState = () => {
    // 当前选中的编号
    const [num, setNum] = useState(-1)
    // 系统默认的配置项列表
    const [lifeStateConfig, setLifeStateConfig] = useState<CommonRowListType[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    // 某个选项的加载动画
    const [opLoading, setOpLoading] = useState(true)
    /** 单击某个选项时触发 */
    const click = useEventCallback((idx: number, text: string) => {
        if (opLoading || num === idx) return
        const _lifeStateConfig = [...lifeStateConfig]
        setNum(idx)
        setOpLoading(true)
        // 为当前选项开启加载动画
        setLifeStateConfig(lifeStateConfig.map((op, order) => (order !== idx ? op : { ...op, isLoading: true })))
        setLifeStateHttpApi(idx)({
            failed: {
                func: () => {
                    setNum(num)
                    message({ title: '状态更改失败，请重试' })
                }
            },
            finally: () => {
                setOpLoading(false)
                setLifeStateConfig(_lifeStateConfig)
            }
        })
    })
    useEffect(() => {
        Promise.all([getLifeStateHttpApi(uid)(), getSystemConfigsHttpApi.acc.lifeState()()]).then(
            ([curLifeState, config]) => {
                const lifeState = config.data.map((text: string, idx: number) => {
                    // 找出当前正在使用的生活状态
                    if (curLifeState.data === text) setNum(idx)
                    // 渲染默认项
                    return { text, click: () => click(idx, text) }
                })
                setLifeStateConfig(lifeState)
                setLoading(false)
                setOpLoading(false)
            }
        )
    }, [])
    return (
        <Sideslip title="生活状态" isLoading={loading}>
            <CommonRow title="选择适合你的生活状态，默认为好运锦鲤" list={lifeStateConfig} selected={num} />
        </Sideslip>
    )
}

export default LifeState
