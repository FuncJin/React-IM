import { Collapse } from 'antd'

import UserSingleColumn from '@components/UserSingleColumn'

import type { FC } from 'react'

import type { FriendsListType } from './interface'

/** 好友列表 */
const FriendsList: FC<FriendsListType> = ({ list }) => {
    const onLineArr = (groupsName: string) => list[groupsName].map((p) => (p.isOnLine ? 1 : 0)) as number[]
    return (
        <Collapse bordered={false} ghost={true} className="im-p-c-classify-section">
            {Object.keys(list).map((groupsName, index) => (
                <Collapse.Panel
                    header={
                        <div className="im-p-c-classify-section-header">
                            <span>{groupsName}</span>
                            <span className="im-p-c-classify-section-h-comment">
                                {onLineArr(groupsName).length
                                    ? onLineArr(groupsName).reduce((acc, cur) => acc + cur)
                                    : 0}
                                /{list[groupsName].length}
                            </span>
                        </div>
                    }
                    key={index}>
                    <ul>
                        {list[groupsName].map((friend) => (
                            <li key={friend.id}>
                                <UserSingleColumn
                                    path={`/intro/${friend.id}`}
                                    avatar={friend.avatar}
                                    nickname={`${friend.nickname}${friend.alias ? ` (${friend.alias})` : ''}`}
                                    isIncNicknameColor={!friend.isOnLine}
                                    text={`${friend.state} ${friend.recently}`}
                                />
                            </li>
                        ))}
                    </ul>
                </Collapse.Panel>
            ))}
        </Collapse>
    )
}

export default FriendsList
