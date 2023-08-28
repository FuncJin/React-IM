import { useState, useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'

import { storage } from '@utils/storage'
import { timeUtils } from '@utils/time'

import { getFriendsCircleSectionTimeHttpApi } from '@api/http/url/get/friendsCircle/sectionTime'

const uid = storage.get('react_im_user_id')
const defaultState = { oid: '', nickname: '', bg: '' }

/** 单独朋友圈(/friendsCircle/single)的更多选项(More) */
const More = () => {
    const [state, setState] = useState({ ...defaultState })
    // 朋友圈可见时间范围
    const [time, setTime] = useState<number | null>(null)
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    const { pathname, state: locationState } = useLocation()
    const oid = locationState?.oid ? locationState?.oid : pathname.split('/')[2]
    useEffect(() => {
        // 是否是手动跳转的路由
        if (locationState) setState(locationState)
        // 可见时间范围
        getFriendsCircleSectionTimeHttpApi(oid)({
            succeed: { func: (time) => setTime(time) },
            failed: { func: () => message({ title: '可见范围获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <>
            <Sideslip title="朋友圈" preTitle={{ title: state.nickname ? state.nickname : '' }} isLoading={loading}>
                <CommonRow
                    title={`${
                        time !== null
                            ? `${state.nickname ? state.nickname : ''}仅展示${timeUtils.getWholeDate(
                                  Number(new Date()) - time
                              )}之前的朋友圈说说`
                            : ''
                    }`}
                />
                <CommonRow
                    list={[
                        {
                            text: '来访记录',
                            to: { pathname: `/friendsCircle/${oid}/more/visitors`, state: { oid } },
                            more: true
                        }
                    ]}
                />
                {uid === oid ? (
                    <CommonRow
                        list={[
                            {
                                text: '朋友圈背景',
                                to: { pathname: `/friendsCircle/${oid}/more/background`, state: { bg: state.bg } },
                                more: true
                            }
                        ]}
                    />
                ) : null}
            </Sideslip>
            <Outlet />
        </>
    )
}

export default More
