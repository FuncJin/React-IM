import { useState, useEffect, useMemo, useCallback } from 'react'

import UploadImg from '@components/Upload/Img'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'

import { useEventCallback } from '@hooks'

import { domMethods } from '@utils/dom'
import { storage } from '@utils/storage'

import { uploadPcBackgroundHttpApi } from '@api/http/url/imgs/user/background/pc'
import { getPcBackgroundHttpApi } from '@api/http/url/get/account/pcBackground'

import './index.less'

/** 大屏主页背景 */
const Background = () => {
    // 当前大屏主页背景的url
    const [url, setUrl] = useState('')
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    /** 取消上传时，将图片恢复为之前的图片 */
    const cancel = useCallback(() => domMethods.changeBodyBackground(storage.get('react_im_pc_home_background')), [])
    const preview = useCallback((url: string) => domMethods.changeBodyBackground(url), [])
    const commentList = useMemo(() => [], [])
    const api = useEventCallback((file) =>
        uploadPcBackgroundHttpApi(file)({
            succeed: {
                func: (url) => {
                    setUrl(url)
                    domMethods.changeBodyBackground(url)
                    storage.set('react_im_pc_home_background', url)
                    message({ title: '已更新你的主页背景' })
                }
            },
            failed: { func: () => message({ title: '主页背景更新失败' }) }
        })
    )
    useEffect(() => {
        getPcBackgroundHttpApi()({
            succeed: { func: (url) => setUrl(url) },
            failed: { func: () => message({ title: '主页背景获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="大屏主页背景" isLoading={loading}>
            <div className="im-settings-style-bg">
                <UploadImg url={url} imgApi={api} onPreview={preview} cancel={cancel} />
            </div>
            <CommonRow
                title="自定义一张你喜欢的主页（全局）背景图片，该图片只会在设备（窗口）宽度大于768px时展示"
                list={commentList}
            />
        </Sideslip>
    )
}

export default Background
