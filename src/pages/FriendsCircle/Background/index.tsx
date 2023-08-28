import { useState, useMemo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import UploadImg from '@components/Upload/Img'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'

import { storage } from '@utils/storage'

import { uploadFriendsCircleBackgroundHttpApi } from '@api/http/url/imgs/user/background/friendsCircle'
import { getFriendsCircleBackgroundHttpApi } from '@api/http/url/get/friendsCircle/background'

/** 朋友圈主页背景 */
const Background = () => {
    const [url, setUrl] = useState('')
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { pathname, state: locationState } = useLocation()
    const commentList = useMemo(() => [], [])
    useEffect(() => {
        if (locationState?.bg) {
            setLoading(false)
            setUrl(locationState.bg)
            return
        }
        const oid = pathname.split('/')[2]
        if (storage.get('react_im_user_id') !== oid) {
            navigate(-1)
            return
        }
        // 获取朋友圈主页背景图
        getFriendsCircleBackgroundHttpApi(oid)({
            succeed: { func: (bg) => setUrl(bg) },
            failed: { func: () => message({ title: '背景获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="设置朋友圈背景" isLoading={loading}>
            <div className="im-panel-intro-container im-panel-intro-bg-img-radius">
                <UploadImg
                    url={url}
                    imgApi={(file) =>
                        uploadFriendsCircleBackgroundHttpApi(file)({
                            succeed: {
                                func: (url) => {
                                    message({ title: '已更新朋友圈主页背景' })
                                    setUrl(url)
                                }
                            },
                            failed: { func: () => message({ title: '更新失败，请重试' }) }
                        })
                    }
                />
            </div>
            <CommonRow title="自定义一张你喜欢的朋友圈主页背景" list={commentList} />
        </Sideslip>
    )
}

export default Background
