import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { PageHeaderType } from './interface'

import './index.less'

/** 页面标题 */
const PageHeader: FC<PageHeaderType> = ({ title, preTitle, nextTitle, isHeaderFloat, isLoading }) => (
    <div className={`im-dialog-side-slip-p-h ${isHeaderFloat ? 'im-dialog-side-slip-p-h-float' : ''}`}>
        <div className="im-d-s-s-p-h-back" onClick={preTitle?.back || (() => {})}>
            <LeftOutlined className="im-d-s-s-p-h-into-back" />
            <span className="im-d-s-s-p-h-into-title">{preTitle?.title ? preTitle.title : '返回'}</span>
        </div>
        {title ? (
            <span className="im-d-s-s-p-h-title">
                {title}
                {isLoading ? (
                    <span>
                        &nbsp;&nbsp;
                        <LoadingOutlined />
                    </span>
                ) : null}
            </span>
        ) : null}
        {nextTitle ? (
            <span
                className="im-d-s-s-p-h-into-title im-d-s-s-p-h-next"
                onClick={nextTitle.next ? nextTitle.next : () => {}}>
                {nextTitle.title}
            </span>
        ) : null}
    </div>
)

export default PageHeader
