import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import { timeUtils } from '@utils/time'

import { getDissolveInformByGroupchatHttpApi } from '@api/http/url/get/inform/groupchat/dissolve'

import type { DissolveGroupchatInform as DissolveGroupchatInformType } from '@api/http/url/get/inform/groupchat/dissolve/interface'

/** 群聊解散通知 */
const Disslove = () => {
    // 群聊解散通知
    const [dissolve, setDIssolve] = useState<DissolveGroupchatInformType[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getDissolveInformByGroupchatHttpApi()({
            succeed: { func: (del) => setDIssolve(del) },
            failed: { func: () => message({ title: '群聊解散通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="群聊解散通知" isLoading={loading}>
            <ul>
                {dissolve.map((inform, idx) => (
                    <li className="im-panel-informs-list" key={idx}>
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.user.id}`}>
                            {inform.user.nickname}
                        </Link>
                        在<time>{timeUtils.getTime(inform.time).all}</time>时解散了群 [
                        <span className="im-p-i-l-msg">
                            {inform.groupchat.nickname}({inform.groupchat.id})
                        </span>
                        ]
                    </li>
                ))}
            </ul>
            {loading ? null : dissolve.length ? null : <Empty feedback="空空如也~" />}
        </Sideslip>
    )
}

export default Disslove
