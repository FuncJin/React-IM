import { Collapse } from 'antd'

import UserSingleColumn from '@components/UserSingleColumn'

import type { FC } from 'react'

import type { GroupchatListType } from './interface'

/** 群聊列表 */
const GroupchatList: FC<GroupchatListType> = ({ list }) => (
    <Collapse bordered={false} ghost={true} className="im-p-c-classify-section">
        {Object.keys(list).map((groupsName, index) => (
            <Collapse.Panel
                header={
                    <div className="im-p-c-classify-section-header">
                        <span>{groupsName}</span>
                        <span className="im-p-c-classify-section-h-comment">
                            {list[groupsName].length ? list[groupsName].length : ''}
                        </span>
                    </div>
                }
                key={index}>
                <ul>
                    {list[groupsName].map((row, index2) => (
                        <li key={index2}>
                            <UserSingleColumn path={`/intro/${row.id}`} avatar={row.avatar} nickname={row.nickname} />
                        </li>
                    ))}
                </ul>
            </Collapse.Panel>
        ))}
    </Collapse>
)

export default GroupchatList
