import { useState, useEffect } from 'react'

import { Collapse } from 'antd'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import Subscribe from './Subscribe'
import Publish from './Publish'

import { getGroupchatRequestInformHttpApi } from '@api/http/url/get/request/groupchat'

import type { GroupchatSubscribeRequest, GroupchatPublishRequest } from '@api/http/url/get/request/groupchat/interface'

/** 群聊申请通知 */
const Request = () => {
    // 收到的群聊申请
    const [subscribe, setSubscribe] = useState<GroupchatSubscribeRequest[]>([])
    // 发出的群聊申请
    const [publish, setPublish] = useState<GroupchatPublishRequest[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    /** 更新群聊申请 */
    const updateRequest = () =>
        getGroupchatRequestInformHttpApi()({
            succeed: {
                func: ({ subscribe, publish }) => {
                    setSubscribe(subscribe)
                    setPublish(publish)
                }
            },
            failed: { func: () => message({ title: '群聊申请获取失败' }) },
            finally: () => setLoading(false)
        })
    useEffect(() => {
        updateRequest()
    }, [])
    return (
        <Sideslip title="群聊申请" isLoading={loading}>
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
                <Empty feedback="空空如也~" />
            )}
        </Sideslip>
    )
}

export default Request
