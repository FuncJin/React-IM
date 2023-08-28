import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input } from 'antd'
import { CommentOutlined } from '@ant-design/icons'

import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'
import { previewImg } from '@components/PreviewImg'
import { playVoice } from '@components/PlayVoice'
import RenderVoiceText from '@components/RenderVoiceText'

import LikedPersons from '@components/FriendsCircleListContent/Liked/Persons'
import LikedIcons from '@components/FriendsCircleListContent/Liked/Icons'
import CommentContent from '@components/FriendsCircleListContent/Comment'

import { useEventCallback } from '@hooks'

import { timeUtils } from '@utils/time'
import { decodeLink } from '@utils/tools/decodeLink'
import { domMethods } from '@utils/dom'

import { switchFriendsCircleLikedStateHttpApi } from '@api/http/url/add/friendsCircle/likedState'
import { createFriendsCircleCommentHttpApi } from '@api/http/url/add/friendsCircle/comment'
import { addFriendsCircleViewCountsHttpApi } from '@api/http/url/add/friendsCircle/viewCounts'

import type { FC } from 'react'
import type { InputRef } from 'antd'

import type { FriendsCircleContent } from '@api/http/url/interface/friendsCircle'
import type { CommentTextType, LikeIconState } from '@components/FriendsCircleListContent/interface'

type SingleType = FriendsCircleContent & { actionCb: () => void }

/** 渲染单条说说 */
const Single: FC<SingleType> = (props) => {
    // 点赞状态
    const [likeState, setLikeState] = useState<LikeIconState>(props.isLiked ? 'liked' : 'dislike')
    // 存储评论或回复的内容
    const [content, setContent] = useState('')
    // 是否进行评论或回复
    const [actions, setActions] = useState<CommentTextType>({
        type: 'comment',
        nickname: '',
        oid: '',
        isLoading: false
    })
    // 说说内容(文字或图片、语音等)
    const textRef = useRef<HTMLParagraphElement>(null)
    const textarea = useRef<InputRef>(null)
    // 点赞或取消点赞
    const handleLiked = useEventCallback(() => {
        const state = likeState === 'liked' ? 0 : 1
        setLikeState('loading')
        switchFriendsCircleLikedStateHttpApi({ key: props.fcKey, use: props.id, state })({
            succeed: {
                func: (_like) => {
                    setLikeState(state ? 'liked' : 'dislike')
                    props.actionCb()
                }
            },
            failed: { func: () => message({ title: '点赞失败' }) }
        })
    })
    /** 提交评论或回复前，进行格式检查 */
    const before = useEventCallback(() => {
        if (actions.isLoading) return
        const len = content.length
        if (!len) return message({ title: '内容不可以为空' })
        if (len > 50) return message({ title: '你输入的内容过长，不能超过50字符', Children: `已超过${len - 50}字符` })
        return true
    })
    // 向后台提交评论或回复
    const putComment = useEventCallback(() => {
        const data = { use: props.id, key: props.fcKey, type: actions.type, oid: actions.oid, content }
        setActions({ ...actions, isLoading: true })
        return createFriendsCircleCommentHttpApi.api(data)({
            succeed: {
                func: (_comment) => {
                    setContent('')
                    setActions({ ...actions, oid: '', isLoading: false })
                    props.actionCb()
                }
            },
            failed: { func: () => message({ title: '评论失败' }) }
        })
    })
    useEffect(() => {
        /**
         * 注：由于message、contacts、friendsCircle会在初始时全部挂载
         * 所以这里会导致朋友圈首屏下的首页列表(前面)说说，会立即进入可见状态
         */
        // 监听本条说说的内容是否可见
        domMethods.intersectionObserver(textRef.current, () =>
            addFriendsCircleViewCountsHttpApi({ key: props.fcKey, use: props.id })()
        )
    }, [])
    return (
        <li className="im-p-fc-single">
            <div className="im-p-fc-s-header">
                <div className="im-p-fc-s-h-avatar">
                    <img src={props.avatar} />
                </div>
                <div>
                    <Link to={`/intro/${props.id}`} className="im-p-fc-s-nickname">
                        {props.nickname}
                    </Link>
                    <p className="im-p-fc-s-text-comment">{timeUtils.getTime(props.time).all}</p>
                </div>
            </div>
            <div>
                <p
                    ref={textRef}
                    className="im-p-fc-s-text"
                    dangerouslySetInnerHTML={{ __html: decodeLink(props.content) }}
                />
                {props.img ? (
                    <img
                        className="im-p-fc-s-img"
                        src={props.img.url}
                        onClick={() => previewImg({ url: props.img!.url })}
                        draggable={false}
                    />
                ) : props.voice ? (
                    <RenderVoiceText
                        isSelf={false}
                        text="语音"
                        {...props.voice}
                        onClick={() => playVoice({ url: props.voice!.url })}
                    />
                ) : null}
                <div className="im-p-fc-s-details">
                    <span className="im-p-fc-s-text-comment">
                        {props.viewCounts.length ? `浏览 ${props.viewCounts.length} 次` : ''}
                    </span>
                    <div className="im-p-fc-s-d-icon">
                        <span className="im-p-fc-s-d-i-liked">
                            <LikedIcons state={likeState} handleLiked={handleLiked} />
                        </span>
                        <CommentOutlined
                            onClick={() => {
                                textarea.current?.focus()
                                setActions({
                                    type: 'comment',
                                    nickname: actions.oid ? '' : `评论${props.nickname}`,
                                    oid: actions.oid ? '' : props.id,
                                    isLoading: false
                                })
                            }}
                        />
                    </div>
                </div>
                <p className="im-p-fc-s-persons">
                    <LikedPersons like={props.like} />
                </p>
                <CommentContent
                    comment={props.comment}
                    handleReply={(oid, nickname) => {
                        textarea.current?.focus()
                        setActions({ type: 'reply', nickname: `回复${nickname}`, oid, isLoading: false })
                    }}
                />
            </div>
            {actions.oid ? (
                <div className="im-p-fc-s-comment-text">
                    <Input.TextArea
                        ref={textarea}
                        placeholder="输入内容"
                        bordered={false}
                        value={content}
                        maxLength={100}
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        onChange={(ev) => setContent(ev.target.value)}
                    />
                    &nbsp;&nbsp;
                    <Button ghost type="primary">
                        <TourAxios
                            name={createFriendsCircleCommentHttpApi.url}
                            disabled="评论"
                            before={before}
                            api={putComment}>
                            {actions.isLoading ? (
                                actions.type === 'comment' ? (
                                    <span>评论中</span>
                                ) : (
                                    <span>回复中</span>
                                )
                            ) : (
                                actions.nickname
                            )}
                        </TourAxios>
                    </Button>
                </div>
            ) : null}
        </li>
    )
}

export default Single
