import { useState, useEffect, memo } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import Slot from '@components/Slot'
import { message } from '@components/Message'

import { defaultConfigs } from './default'

import { apiStateDetailsKey } from '@api/http/utils/apiStateDetailsKey'
import { getApiStateDetailsHttpApi } from '@api/http/url/get/system/apiStateDetails'

import type { MouseEvent } from 'react'

import type { ApiStateDetails } from '@api/http/url/get/system/apiStateDetails/interface'
import type { TourAxiosType, ChildrenType } from './interface'

/** 接口状态(处于此容器中的接口就是不可用的接口) */
let apiState = new Map<string, string>([])
let _force: any = () => {}

getApiStateDetailsHttpApi()({
    succeed: {
        func: (data) => {
            const keys = Object.keys(data) as (keyof ApiStateDetails)[]
            const map = new Map<string, string>([])
            keys.forEach((k) => data[k].forEach(({ name }) => map.set(name, apiStateDetailsKey[k])))
            apiState = map
            try {
                _force(1)
            } catch (err) {}
        }
    }
})

/** 渲染子元素 */
const renderChildren = (Children: ChildrenType) => (typeof Children === 'function' ? <Slot>{Children}</Slot> : Children)

/** 在每个触发Http请求的dom节点上展现加载动画(并不是在全局中进行加载动画) */
const TourAxios: TourAxiosType = ({
    name,
    disabled,
    api,
    before,
    after,
    failed,
    succeed,
    resend,
    loading,
    children
}) => {
    // 是否出现加载动画
    const [load, setLoad] = useState(false)
    // 已发送过多少次请求
    const [counts, setCounts] = useState(0)
    // 当前请求节点的展示内容（值为ReactNode或FC）
    const [Children, setChildren] = useState<ChildrenType>(children)
    const [, force] = useState(0)
    const handleApi = async (ev: MouseEvent<HTMLDivElement>) => {
        ev.preventDefault()
        ev.stopPropagation()
        // 进入发起请求前的校验
        if (before) {
            if (!(await before())) return
        }
        // 状态是否处于请求中（在未收到上次请求的响应前，会进入此逻辑处理）
        if (load) {
            // 是否允许在未收到上一次响应前就发起下一次请求
            const { loop, feedback } = loading || defaultConfigs.loading
            if (!loop) return feedback && feedback()
        }
        // 不是初次发送请求的情况
        if (counts) {
            const { is, feedback } = resend || defaultConfigs.resend
            if (!is) return feedback && feedback()
        }
        setLoad(true)
        const __ChilrenLoading = loading?.isOnlyIcon ? '' : '正在加载'
        const _ChildrenLoading = loading?.children ? loading.children : __ChilrenLoading
        const afterFunc = () => {
            const { end, children: afterChildren } = after || defaultConfigs.after
            afterChildren && setChildren(afterChildren)
            end && end(data)
        }
        setChildren(_ChildrenLoading)
        const data = await api()
        setLoad(false)
        setCounts(counts + 1)
        setChildren(children)
        if (typeof data === 'object' && data.type === 'error') {
            // 请求失败(响应状态码不为10000)
            const { end, children: failedChildren } = failed || defaultConfigs.failed
            failedChildren && setChildren(failedChildren)
            end && end(data.message)
            // after的逻辑
            afterFunc()
            return
        }
        // 请求成功
        succeed && succeed(data)
        afterFunc()
    }
    useEffect(() => {
        // 只有配置了name时，才去接管api状态
        if (name) _force = force
    }, [])
    useEffect(() => {
        setChildren(children)
    }, [children])
    const show = (
        <div onClick={handleApi}>
            {load ? (
                <span>
                    {renderChildren(Children)}
                    &nbsp;&nbsp;
                    {loading?.isHiddenIcon === false ? null : <LoadingOutlined />}
                </span>
            ) : (
                renderChildren(Children)
            )}
        </div>
    )
    return name ? (
        apiState.has(name) ? (
            <div
                style={{ opacity: 0.6 }}
                onClick={(ev) => {
                    ev.preventDefault()
                    message({ title: `${disabled}接口目前${apiState.get(name)}，暂不可用` })
                }}>
                <span>{`${disabled}功能${apiState.get(name)}`}</span>
            </div>
        ) : (
            show
        )
    ) : (
        show
    )
}

export default memo(TourAxios)
