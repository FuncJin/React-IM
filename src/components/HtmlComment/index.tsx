import { useEffect, useRef, memo } from 'react'

import type { FC } from 'react'

import type { HtmlCommentType } from './interface'

/** 在TSX中添加html类型的注释，并渲染至html dom中 */
const HtmlComment: FC<HtmlCommentType> = ({ children }) => {
    const virtual = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        virtual.current!.outerHTML = `<!-- ${children} -->`
    }, [])
    return <span ref={virtual} />
}

export default memo(HtmlComment)
