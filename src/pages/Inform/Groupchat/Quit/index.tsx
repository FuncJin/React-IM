import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import { timeUtils } from '@utils/time'

import { getQuitInformByGroupchatHttpApi } from '@api/http/url/get/inform/groupchat/quit'

import type { QuitGroupchatInform as QuitInform } from '@api/http/url/get/inform/groupchat/quit/interface'

/** 获取当前用户的退群通知(谁退出了群聊) */
const Quit = () => {
    // 退出群聊通知列表
    const [quit, setQuit] = useState<QuitInform[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getQuitInformByGroupchatHttpApi()({
            succeed: { func: (quit) => setQuit(quit) },
            failed: { func: () => message({ title: '退出群聊通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="退群通知" isLoading={loading}>
            <ul>
                {quit.map((inform, idx) => (
                    <li className="im-panel-informs-list" key={idx}>
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.user.id}`}>
                            {inform.user.nickname}
                        </Link>
                        在<time>{timeUtils.getTime(inform.time).all}</time>时离开了群聊
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.groupchat.id}`}>
                            {inform.groupchat.nickname}
                        </Link>
                    </li>
                ))}
            </ul>
            {loading ? null : quit.length ? null : <Empty feedback="空空如也~" />}
        </Sideslip>
    )
}

export default Quit
