import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { InputNumber } from 'antd'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { constant } from '@constant'
import { timeUtils } from '@utils/time'

import { banMemberByGroupchatHttpApi } from '@api/http/url/set/groupchat/ban'
import { getGroupchatBanTimeHttpApi } from '@api/http/url/get/groupchat/banTime'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'

/** 禁言成员 */
const Ban = () => {
    // 当前用户在当前群聊中的禁言剩余时间
    const [banDur, setBanDur] = useState(0)
    // 标题加载动画
    const [isLoading, setIsLoading] = useState(true)
    const [time, setTime] = useState({ d: 0, h: 0, m: 0 })
    const [info, setInfo] = useState({ dur: 0, d: 0, h: 0, m: 0 })
    const [nickname, setNickname] = useState('')
    const { pathname } = useLocation()
    const [, , , gid, oid] = pathname.split('/')
    /** 禁言前对格式进行检查 */
    const before = useEventCallback(() => {
        const { days, hours, min } = constant.time
        const { d, h, m } = time
        const dur = days._1 * d + hours._1 * h + min._1 * m
        if (dur < min._1) return message({ title: '最小禁言时长为1分钟' })
        if (dur > days._7) return message({ title: '最大禁言时长为7天' })
        setInfo({ dur, d, h, m })
        return true
    })
    /** 禁言 */
    const banMember = useEventCallback(() => {
        const { dur, d, h, m } = info
        const title = `已禁言${nickname}${d ? `${d}天` : ''}${h ? `${h}小时` : ''}${m ? `${m}分钟` : ''}`
        return banMemberByGroupchatHttpApi.api({ gid, oid, dur })({
            succeed: {
                func: async () => {
                    setIsLoading(true)
                    await getBanDur()
                    setIsLoading(false)
                    message({ title })
                }
            },
            failed: { func: () => message({ title: '禁言失败，请重试' }) }
        })
    })
    /** 解除禁言 */
    const relieveBan = useEventCallback(() =>
        banMemberByGroupchatHttpApi.api({ gid, oid, dur: 0 })({
            succeed: {
                func: async () => {
                    setIsLoading(true)
                    await getBanDur()
                    setIsLoading(false)
                    message({ title: `已为${nickname}解除禁言` })
                }
            },
            failed: { func: () => message({ title: '解除禁言失败，请重试' }) }
        })
    )
    const banList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={banMemberByGroupchatHttpApi.url}
                        disabled="禁言成员"
                        before={before}
                        api={banMember}
                        loading={{ children: '处理中' }}>
                        确定禁言
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    const banComment = useMemo(
        () =>
            `在上方输入你要禁言“${nickname}(${oid})”的时长后，即可点此进行禁言。禁言后，只有你与${nickname}知晓该禁言动作的发生，群聊内的其他人均不会收到该禁言通知`,
        [nickname, oid]
    )
    const getBanDur = () =>
        getGroupchatBanTimeHttpApi({ gid, oid })({
            succeed: { func: (dur) => setBanDur(dur) },
            failed: { func: () => message({ title: '禁言时间获取失败' }) }
        })
    useEffect(() => {
        getBanDur().finally(() => setIsLoading(false))
        getNicknameHttpApi(oid)({ succeed: { func: (nickname) => setNickname(nickname) } })
    }, [])
    return (
        <Sideslip title={`禁言成员(${oid})`} isLoading={isLoading}>
            <CommonRow
                title="天数（最大为7天）"
                list={[
                    {
                        text: (
                            <InputNumber
                                bordered={false}
                                max={7}
                                min={0}
                                value={time.d}
                                onChange={(d) => setTime({ ...time, d: d! })}
                            />
                        )
                    }
                ]}
            />
            <CommonRow
                title="小时（最大为24小时）"
                list={[
                    {
                        text: (
                            <InputNumber
                                bordered={false}
                                max={24}
                                min={0}
                                value={time.h}
                                onChange={(h) => setTime({ ...time, h: h! })}
                            />
                        )
                    }
                ]}
            />
            <CommonRow
                title="分钟（最大为60分钟）"
                list={[
                    {
                        text: (
                            <InputNumber
                                bordered={false}
                                max={60}
                                min={0}
                                value={time.m}
                                onChange={(m) => setTime({ ...time, m: m! })}
                            />
                        )
                    }
                ]}
            />
            <CommonRow list={banList} comment={banComment} />
            {banDur ? (
                <CommonRow
                    list={[
                        {
                            text: (
                                <TourAxios
                                    name={banMemberByGroupchatHttpApi.url}
                                    disabled="禁言成员"
                                    api={relieveBan}
                                    loading={{ children: '解除中' }}>
                                    解除禁言
                                </TourAxios>
                            ),
                            subTitle: `或等待至 ${timeUtils.getWholeDate(banDur)} 时自动解除`
                        }
                    ]}
                    comment="该成员当前正处于禁言中，如果你想增加/减少禁言时长，则可以在上方重新输入禁言时长。若你想解除禁言，则单击此按钮即可"
                />
            ) : null}
        </Sideslip>
    )
}

export default Ban
