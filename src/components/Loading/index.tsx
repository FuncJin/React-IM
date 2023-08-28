import { memo } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { LoadingType } from './interface'

import './index.less'

/** 展示相对于页面而言的加载动画 */
const Loading: FC<LoadingType> = ({ tip }) => (
    <div className="im-page-loading">
        <div className="im-p-l-section">
            <LoadingOutlined />
            <div className="im-p-l-s-text">{tip}</div>
        </div>
    </div>
)

export default memo(Loading)
