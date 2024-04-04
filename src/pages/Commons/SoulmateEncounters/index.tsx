import { useState, useEffect } from 'react'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'

import { getSoulmateEncountersHttpApi } from '@api/http/url/get/list/soulmateEncounters'

import type { EveryAccountBasisInfo } from '@api/http/url/interface/account'

import './index.less'

/** 知己相逢 */
const SoulmateEncounters = () => {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState<EveryAccountBasisInfo[]>([])
    useEffect(() => {
        getSoulmateEncountersHttpApi()({
            succeed: { func: (list) => setList(list) },
            failed: { func: () => message({ title: '在线用户获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="知己相逢" isLoading={loading}>
            {list.length !== 1 ? (
                <>
                    <div className="im-soulmate-encounters">
                        {list.map((content, i) => (
                            <a href={`/intro/${content.id}`} key={i}>
                                <img src={content.avatar} />
                                <p>{content.nickname}</p>
                            </a>
                        ))}
                    </div>
                    <CommonRow
                        comment={`人生因为主动才会变得有意义，此刻IM中有${
                            list.length - 1
                        }位用户与你同时在线，点击头像即可进入他(她)的主页。`}
                    />
                </>
            ) : (
                <CommonRow comment="人生因为主动才会变得有意义，此刻IM平台中仅你自己在线，不过你可以选择将此平台分享给其他(她)用户使用。" />
            )}
        </Sideslip>
    )
}

export default SoulmateEncounters
