import { Fragment } from 'react'

import Empty from '@components/Empty'

import Single from './Single'

import type { FC } from 'react'

import type { FriendsCircleListType } from './interface'

import './index.less'

/** 朋友圈说说列表(渲染说说列表) */
const FriendsCircleListContent: FC<FriendsCircleListType> = ({ list, actionCb }) => (
    <ul className={`im-panel-friends-circle ${list.length ? '' : 'im-panel-friends-circle-empty'}`}>
        {list.map((single, _key) => {
            single.fcKey = single.key as unknown as string
            return (
                <Fragment key={_key}>
                    <Single {...single} actionCb={actionCb ? actionCb : () => {}} />
                </Fragment>
            )
        })}
        {!list.length ? <Empty feedback="暂无动态" type="friendsCircle" /> : null}
    </ul>
)

export default FriendsCircleListContent
