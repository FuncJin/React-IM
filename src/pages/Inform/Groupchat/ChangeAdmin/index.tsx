import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import Empty from '@components/Empty'

import { timeUtils } from '@utils/time'

import { getChangeAdminInformByGroupchatHttpApi } from '@api/http/url/get/inform/groupchat/changeAdmin'

import type { ChangeAdminGroupchatInform } from '@api/http/url/get/inform/groupchat/changeAdmin/interface'

/** 获取管理员变更通知(只会在当前用户管理及创建的群聊下进行获取) */
const ChangeAdmin = () => {
    // 管理员变更通知
    const [adminsChange, setAdminsChange] = useState<ChangeAdminGroupchatInform[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getChangeAdminInformByGroupchatHttpApi()({
            succeed: { func: (adminsChange) => setAdminsChange(adminsChange) },
            failed: { func: () => message({ title: '管理员变更通知获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="管理员变更通知" isLoading={loading}>
            <ul>
                {adminsChange.map((inform, idx) => (
                    <li className="im-panel-informs-list" key={idx}>
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.host.id}`}>
                            {inform.host.nickname}
                        </Link>
                        在<time>{timeUtils.getTime(inform.time).all}</time>时
                        <span className="im-p-i-l-admins-change">
                            {inform.state ? (
                                <span className="im-p-i-l-other-result">增添</span>
                            ) : (
                                <span className="im-p-i-l-danger">取消</span>
                            )}
                        </span>
                        了
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.user.id}`}>
                            {inform.user.nickname}
                        </Link>
                        在群聊&nbsp;
                        <Link className="im-p-i-l-request-nickname" to={`/intro/${inform.groupchat.id}`}>
                            {inform.groupchat.nickname}
                        </Link>
                        &nbsp;中的管理员身份
                    </li>
                ))}
            </ul>
            {loading ? null : adminsChange.length ? null : (
                <Empty feedback="变更通知空空如也，可以尝试多添加一些群聊哦~" />
            )}
        </Sideslip>
    )
}

export default ChangeAdmin
