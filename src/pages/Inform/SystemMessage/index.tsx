import { useState, useEffect } from 'react'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'

import { timeUtils } from '@utils/time'

import { getSystemInformHttpApi } from '@api/http/url/get/inform/system/body'

import type { SystemInform } from '@api/http/url/get/inform/system/body/interface'

import './index.less'

/** 平台消息(站内信) */
const SystemMessage = () => {
    // 平台通知
    const [inform, setInform] = useState<SystemInform[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getSystemInformHttpApi()({
            succeed: { func: (inform) => setInform(inform) },
            failed: { func: () => message({ title: '站内信获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="站内信" isLoading={loading}>
            <article className="im-panel-system-inform">
                {inform.map((section, key) => (
                    <section className="im-p-s-i-single" key={key}>
                        <p className="im-p-s-i-t-time">{timeUtils.getTime(section.time).all}</p>
                        <div
                            className="im-p-s-i-content"
                            dangerouslySetInnerHTML={{
                                __html: `<p class="im-p-s-i-s-title">${
                                    section.title
                                }</p><p class="im-p-s-i-s-sub-title">${
                                    section.sub_title ? section.sub_title : ''
                                }</p><p class="im-p-s-i-s-content">${section.content}</p>${
                                    section.writer ? `<div class="im-p-s-i-s-footer">${section.writer}</div>` : ''
                                }`
                            }}
                        />
                    </section>
                ))}
            </article>
        </Sideslip>
    )
}

export default SystemMessage
