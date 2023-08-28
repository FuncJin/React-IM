import { Tag } from 'antd'

import type { FC } from 'react'

import type { ShowHomePageTagsType } from './interfaces'

import './index.less'

const ShowHomePageTags: FC<ShowHomePageTagsType> = ({ tags }) => (
    <span className="im-show-home-page-tags">
        {Object.keys(tags).map((color) =>
            tags[color].map((text, idx) => (
                <Tag key={idx} className={`im-home-page-tag im-home-page-tag-${color}`}>
                    {text}
                </Tag>
            ))
        )}
    </span>
)

export default ShowHomePageTags
