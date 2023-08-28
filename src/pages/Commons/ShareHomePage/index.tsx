import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import QRCode from 'qrcode'

import { Button } from 'antd'

import Sideslip from '@components/Sideslip'

import { constant } from '@constant'
import { copyContent } from '@utils/device/copyContent'
import { storage } from '@utils/storage'

import { getAvatarHttpApi } from '@api/http/url/get/account/avatar'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getIdTypeHttpApi } from '@api/http/url/account/type/id'

import type { AccountType } from '@api/http/url/interface/account'
import type { CustomObject } from '@interface/type'
import type { ShareKey } from './interface'

import './index.less'

const _url = (id: string) => `${constant.env.url.host}/intro/${id}`
const _uid = storage.get('react_im_user_id')

/** 生成分享用户或群聊的链接 */
const shareUrl: CustomObject<AccountType, ShareKey> = {
    noid: () => `React IM官方交流群：100000，欢迎加入！`,
    uid: (uid, nickname) =>
        `嗨，别来无恙。我分享了${uid === _uid ? '我' : nickname}的 React IM 主页给你，快来与${
            uid === _uid ? '我' : 'Ta'
        }畅聊吧 ${_url(uid)}`,
    gid: (gid, nickname) => `嗨，别来无恙。我分享了${nickname}的 React IM 群聊主页给你，即刻与大家畅聊吧 ${_url(gid)}`
}

/** 分享主页(用户或群聊) */
const ShareHomePage = () => {
    const [avatar, setAvatar] = useState('')
    const [nickname, setNickname] = useState('')
    // 当前id类型
    const [type, setType] = useState<AccountType>('noid')
    const ref = useRef(null)
    const { pathname } = useLocation()
    const id = pathname.split('/')[2]
    useEffect(() => {
        getAvatarHttpApi(id)({ succeed: { func: (avatar) => setAvatar(avatar) } })
        getNicknameHttpApi(id)({ succeed: { func: (nickname) => setNickname(nickname) } })
        getIdTypeHttpApi(id)({ succeed: { func: (type) => setType(type) } })
        // 绘制二维码
        QRCode.toCanvas(ref.current, _url(id), { width: 200, margin: 0 })
    }, [])
    return (
        <Sideslip title="分享主页" preTitle={{ title: nickname }}>
            <div className="im-intro-share-page">
                <div className="im-i-s-p-qr-code">
                    <img className="im-img-avatar-radius" src={avatar} />
                    <div className="im-i-s-p-qr-code-body">
                        <p className="im-i-s-p-qr-code-b-nickname">{nickname}</p>
                        <p className="im-i-s-p-qr-code-b-id">ID: {id}</p>
                        <canvas ref={ref} />
                    </div>
                </div>
                <Button
                    type="primary"
                    onClick={() =>
                        copyContent(
                            shareUrl[type](id, nickname),
                            `已复制${type === 'uid' ? (id === _uid ? '' : 'Ta的') : '该群'}主页链接`
                        )
                    }>
                    复制主页链接
                </Button>
            </div>
        </Sideslip>
    )
}

export default ShareHomePage
