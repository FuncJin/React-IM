import { useState, useEffect } from 'react'

import { Collapse } from 'antd'

import Sideslip from '@components/Sideslip'
import Empty from '@components/Empty'
import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'

import InformBody from './InformBody'

import { getFriendsCircleRequestHttpApi } from '@api/http/url/get/inform/friendsCircle/body'

import type { FriendsCircleInform as FriendsCircleInformType } from '@api/http/url/get/inform/friendsCircle/body/interface'

import './index.less'

/** 每条通知的类型 */
const InformType = {
    comment: '评论',
    reply: '回复',
    liked: '点赞'
}

/** 朋友圈收到与发出的通知 */
const FriendsCircle = () => {
    // 收到与发出的通知
    const [inform, setInform] = useState<FriendsCircleInformType>({ subscribe: [], publish: [] })
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getFriendsCircleRequestHttpApi()({
            succeed: { func: (inform) => setInform(inform) },
            failed: { func: () => message({ title: '朋友圈通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="朋友圈通知" isLoading={loading}>
            <div>
                <Collapse bordered={false} ghost={true}>
                    <Collapse.Panel header="我收到的" key={0}>
                        <ul>
                            {inform.subscribe.map((row, index) => (
                                <li key={index} className="im-p-fc-informs-list">
                                    <InformBody row={row} informText={`${InformType[row.type]}了我`} />
                                </li>
                            ))}
                            {loading ? null : inform.subscribe.length ? null : (
                                <Empty feedback="暂无收到的通知" type="friendsCircleInform" />
                            )}
                        </ul>
                    </Collapse.Panel>
                    <Collapse.Panel header="我发出的" key={1}>
                        <ul>
                            {inform.publish.map((row, index) => (
                                <li key={index} className="im-p-fc-informs-list">
                                    <InformBody row={row} informText={`我${InformType[row.type]}了此条说说`} />
                                </li>
                            ))}
                            {loading ? null : inform.publish.length ? null : (
                                <Empty feedback="暂无发出的通知" type="friendsCircleInform" />
                            )}
                        </ul>
                    </Collapse.Panel>
                </Collapse>
            </div>
            <CommonRow title="如果点赞(或评论等)自己的说说，则你会同时收到“我发出的”与“我收到的”两种通知" />
        </Sideslip>
    )
}

export default FriendsCircle
