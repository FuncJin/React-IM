import { useState, useEffect } from 'react'

import { Collapse } from 'antd'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import Subscribe from './Subscribe'
import Publish from './Publish'

import { getFriendsRequestInformHttpApi } from '@api/http/url/get/request/friend'

import type { UserSubscribeRequest, UserPublishRequest } from '@api/http/url/get/request/friend/interface'

/** 好友申请通知 */
const FriendsRequest = () => {
    // 收到的好友申请
    const [subscribe, setSubscribe] = useState<UserSubscribeRequest[]>([])
    // 发出的好友申请
    const [publish, setPublish] = useState<UserPublishRequest[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    /** 更新好友申请通知 */
    const updateRequest = () =>
        getFriendsRequestInformHttpApi()({
            succeed: {
                func: ({ subscribe, publish }) => {
                    setSubscribe(subscribe)
                    setPublish(publish)
                }
            },
            failed: { func: () => message({ title: '好友申请获取失败' }) },
            finally: () => setLoading(false)
        })
    useEffect(() => {
        updateRequest()
    }, [])
    return (
        <Sideslip title="好友申请" isLoading={loading}>
            {loading ? null : subscribe.length + publish.length ? (
                <Collapse bordered={false} ghost={true}>
                    <Collapse.Panel header="我收到的" key={0}>
                        <Subscribe subscribe={subscribe} updateRequest={updateRequest} />
                    </Collapse.Panel>
                    <Collapse.Panel header="我发出的" key={1}>
                        <Publish publish={publish} />
                    </Collapse.Panel>
                </Collapse>
            ) : (
                <Empty feedback="好友申请空空如也，快去结交更多好友吧~" />
            )}
        </Sideslip>
    )
}

export default FriendsRequest
