import { memo } from 'react'

import { bar } from './bar'

import type { FC } from 'react'

import type { EmptyType } from './interface'

import './index.less'

/** 空组件(以图片的形式展示) */
const Empty: FC<EmptyType> = ({ feedback, type }) => (
    <div className="im-empty">
        <div className="im-e-section">
            {type ? <div className={`im-e-s-img ${bar[type]}`} /> : null}
            <p>{feedback}</p>
        </div>
    </div>
)

export default memo(Empty)
