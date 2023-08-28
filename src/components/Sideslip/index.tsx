import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import PageHeader from '@components/PageHeader'

import { cancelBubble } from '@utils/tools/cancelBubble'

import type { FC } from 'react'

import type { SideslipType } from './interface'

import './index.less'

const getBodyPadding = (is: undefined | boolean) =>
    is === undefined ? 'im-dialog-sideslip-body-padding' : is ? 'im-dialog-sideslip-body-padding' : ''
const getBodyFill = (is: undefined | boolean) => (is === undefined ? '' : is ? '' : 'im-dialog-sideslip-body-fill')
const getPageHeader = (is: undefined | boolean) => (is === undefined ? true : is)

/** 用于在侧方向上滑出一个新页面(独立页面或二级、多级页面) */
const Sideslip: FC<SideslipType> = ({
    title,
    preTitle,
    nextTitle,
    children,
    isHeaderFloat,
    isOnlyText,
    isPadding,
    isWhiteBgColor,
    isPageHeader,
    isLoading,
    isForward
}) => {
    const [state, setState] = useState(true)
    const navigate = useNavigate()
    const _preTitle = preTitle ? preTitle : {}
    const hidden = () => {
        preTitle?.back && preTitle.back()
        if (isForward === undefined || isForward) navigate(-1)
    }
    return createPortal(
        <div
            className={`im-dialog-sideslip ${isWhiteBgColor ? 'im-dialog-sideslip-bg-color' : ''} ${
                state ? '' : 'im-dialog-sideslip-bounce-h'
            }`}
            onMouseDown={(ev) => cancelBubble(ev)}>
            {getPageHeader(isPageHeader) ? (
                <PageHeader
                    title={title}
                    preTitle={{
                        ..._preTitle,
                        back: () => {
                            setState(false)
                            setTimeout(hidden, 400)
                        }
                    }}
                    nextTitle={nextTitle}
                    isHeaderFloat={isHeaderFloat}
                    isLoading={isLoading}
                />
            ) : null}
            <div
                className={`im-dialog-sideslip-body ${isHeaderFloat ? 'im-dialog-sideslip-body-float' : ''} ${
                    isLoading ? 'im-dialog-sideslip-body-ban' : ''
                } ${getBodyPadding(isPadding)} ${getBodyFill(isPageHeader)}`}>
                {isOnlyText ? <p className="im-dialog-sideslip-body-only-text">{children}</p> : children}
            </div>
        </div>,
        document.querySelector('#im-dialog')!
    )
}

export default Sideslip
