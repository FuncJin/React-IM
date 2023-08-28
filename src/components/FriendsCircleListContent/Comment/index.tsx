import { Link } from 'react-router-dom'

import type { FC } from 'react'

import type { CommentType } from './interface'

/** 渲染评论及回复 */
const Comment: FC<CommentType> = ({ comment, handleReply }) =>
    comment.length ? (
        <ul className="im-p-fc-s-comment">
            {comment.map((p, key) =>
                p.type === 'reply' ? (
                    <li key={key} onClick={() => handleReply(p.user.id, p.user.nickname)}>
                        <Link className="im-p-fc-s-nickname" to={`/intro/${p.user.id}`}>
                            {p.user.nickname}
                        </Link>
                        <span>&nbsp;&nbsp;回复了&nbsp;&nbsp;</span>
                        <Link className="im-p-fc-s-nickname" to={`/intro/${p.below.id}`}>
                            {p.below.nickname}
                        </Link>
                        ：{p.content}
                    </li>
                ) : (
                    <li key={key} onClick={() => handleReply(p.id, p.nickname)}>
                        <Link className="im-p-fc-s-nickname" to={`/intro/${p.id}`}>
                            {p.nickname}
                        </Link>
                        ：{p.content}
                    </li>
                )
            )}
        </ul>
    ) : null

export default Comment
