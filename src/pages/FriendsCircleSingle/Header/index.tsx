import { previewImg } from '@components/PreviewImg'

import type { FC } from 'react'

import type { Header as HeaderType } from './interface'

/** 朋友圈主页的头部内容 */
const Header: FC<HeaderType> = ({ url: { avatar, bg }, limit: { content, visitors }, nickname }) => (
    <div
        className="im-panel-friends-circle-single-bg im-p-i-c-cover im-panel-intro-container"
        style={{ backgroundImage: `url('${bg}')` }}
        onClick={() => previewImg({ url: bg })}>
        <div className="im-p-i-c-shade" />
        <div className="im-panel-friends-circle-single-header" onClick={(ev) => ev.stopPropagation()}>
            <div className="im-p-fc-s-h-avatar">
                <img className="im-img-avatar-radius" src={avatar} onClick={() => previewImg({ url: avatar })} />
            </div>
            <div className="im-p-fc-s-h-title">
                <p>{nickname}</p>
                <div className="im-p-fc-s-h-t-comment">
                    <div className="im-p-fc-s-h-t-content">
                        <p className="im-p-fc-s-h-counts">{content}</p>
                        <p>说说</p>
                    </div>
                    <div>
                        <p className="im-p-fc-s-h-counts">{visitors}</p>
                        <p>访客</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Header
