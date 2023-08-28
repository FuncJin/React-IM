import { useState, useEffect } from 'react'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'

import { textTitle } from './title'
import { defaultInform } from './msg'

import { getHomeUnreadInformHttpApi } from '@api/http/url/get/inform/unread/inform'

/** 首页未读通知 */
const HomeUnread = () => {
    // 未读通知
    const [msg, setMsg] = useState({ ...defaultInform })
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    const friendsKey = Object.keys(msg.friends.data) as (keyof typeof msg.friends.data)[]
    const groupchatKey = Object.keys(msg.groupchat.data) as (keyof typeof msg.groupchat.data)[]
    const introKey = Object.keys(msg.intro.data) as (keyof typeof msg.intro.data)[]
    const friendsCircleKey = Object.keys(msg.friendsCircle.data) as (keyof typeof msg.friendsCircle.data)[]
    const textType = [
        ['好友相关', 'friends', friendsKey],
        ['群聊相关', 'groupchat', groupchatKey],
        ['主页相关', 'intro', introKey],
        ['朋友圈相关', 'friendsCircle', friendsCircleKey]
    ] as const
    useEffect(() => {
        getHomeUnreadInformHttpApi()({
            succeed: { func: (data) => setMsg(data) },
            failed: { func: () => message({ title: '未读通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="未读通知" isLoading={loading}>
            {loading ? null : !msg.totals ? (
                <CommonRow title="截止此时，你还没有新的未读通知~" />
            ) : (
                <>
                    <CommonRow title={`截止此时，你共有未读通知${msg.totals}条`} />
                    {textType.map(([title, comment, keys], i) => (
                        <CommonRow
                            key={i}
                            title={`${title}(${msg[comment].totals})`}
                            list={
                                msg[comment].totals
                                    ? keys.map((type) => ({
                                          text: (textTitle as any)[comment][type],
                                          description: (msg as any)[comment].data[type],
                                          to: { pathname: `/inform/${type}` },
                                          more: true
                                      }))
                                    : [{ text: '暂无' }]
                            }
                        />
                    ))}
                </>
            )}
        </Sideslip>
    )
}

export default HomeUnread
