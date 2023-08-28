import { useState, useEffect } from 'react'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'

import { timeUtils } from '@utils/time'

import { getVersionsHttpApi } from '@api/http/url/get/system/versions'

import type { VersionsType } from '@api/http/url/get/system/versions/interface'

import './index.less'

/** 平台历史版本列表 */
const Versions = () => {
    // 平台版本历史更新记录
    const [versionDescription, setVersionDescription] = useState<VersionsType[]>([])
    // 标题加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getVersionsHttpApi()({
            succeed: { func: (data) => setVersionDescription(data) },
            failed: { func: () => message({ title: '版本历史记录获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="版本历史记录" isLoading={loading}>
            <div className="im-panel-versions">
                {versionDescription.map((version, idx) => (
                    <div className="im-p-v-cur" key={idx}>
                        <div className="im-p-v-c-title">
                            {idx === 0 ? (
                                <span className="im-p-v-c-t-num im-p-v-c-t-num-cur">{version.num} (当前版本)</span>
                            ) : (
                                <span className="im-p-v-c-t-num">{version.num}</span>
                            )}
                            <span className="im-p-v-c-t-time">{timeUtils.getDate(version.time)}</span>
                        </div>
                        <ul>
                            {version.description.map((description, idx) => (
                                <li key={idx}>{description}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Sideslip>
    )
}

export default Versions
