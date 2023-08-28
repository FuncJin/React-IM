import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import { storage } from '@utils/storage'
import { timeUtils } from '@utils/time'

import { getKickInformByGroupchatHttpApi } from '@api/http/url/get/inform/groupchat/kick'

import type { KickGroupchatInform as KickInformType } from '@api/http/url/get/inform/groupchat/kick/interface'

const uid = storage.get('react_im_user_id')

/** 获取当前用户所创建与管理的群聊的踢出群聊通知，及当前用户被踢出的群聊通知 */
const Kick = () => {
    // 踢出群聊通知
    const [kick, setKick] = useState<KickInformType[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getKickInformByGroupchatHttpApi()({
            succeed: { func: (kick) => setKick(kick) },
            failed: { func: () => message({ title: '踢出群聊通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="踢出群聊通知" isLoading={loading}>
            <ul>
                {kick.map((inform, idx) => (
                    <li className="im-panel-informs-list" key={idx}>
                        {inform.beKick.id === uid ? (
                            '你'
                        ) : (
                            <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.beKick.id}`}>
                                {inform.beKick.nickname}
                            </Link>
                        )}
                        已被
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.handler.id}`}>
                            {inform.handler.nickname}
                        </Link>
                        移出群
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.groupchat.id}`}>
                            {inform.groupchat.nickname}
                        </Link>
                        <br />
                        移出时间：<time>{timeUtils.getTime(Number(new Date(inform.time))).all}</time>
                    </li>
                ))}
            </ul>
            {loading ? null : kick.length ? null : <Empty feedback="空空如也~" />}
        </Sideslip>
    )
}

export default Kick
