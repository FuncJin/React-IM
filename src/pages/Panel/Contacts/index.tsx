import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import HtmlComment from '@components/HtmlComment'
import { message } from '@components/Message'

import FriendsList from './FriendsList'
import GroupchatList from './GroupchatList'
import More from './More'

import { getFriendsListHttpApi } from '@api/http/url/get/list/friend'
import { getGroupchatListHttpApi } from '@api/http/url/get/list/groupchat'

import { proxyHomeSocketByOnApi } from '@api/socket/events/on/home'

import type { PanelBodyPageType } from '@components/Panel/interface'
import type { FriendsList as FriendsListType } from '@api/http/url/get/list/friend/interface'
import type { GroupchatList as GroupchatListType } from '@api/http/url/get/list/groupchat/interface'

import './index.less'

// 初次挂载时，是否正在获取联系人
let initLoading = true

/** 首页联系人页面 */
const Contacts: PanelBodyPageType = forwardRef((props, ref) => {
    // 当前所在的选项(区域)
    const [currentArea, setCurrentArea] = useState<keyof typeof panel>('friendsGroup')
    // 好友列表
    const [friendList, setFriendList] = useState<FriendsListType>({})
    // 群聊列表
    const [groupchatList, setGroupchatList] = useState<GroupchatListType>({})
    /** 渲染好友列表及群聊列表 */
    const renderContactsList = () =>
        Promise.all([
            getFriendsListHttpApi()({
                succeed: { func: (f) => setFriendList(f) },
                failed: { func: () => message({ title: '好友列表获取失败' }) }
            }),
            getGroupchatListHttpApi()({
                succeed: { func: (g) => setGroupchatList(g) },
                failed: { func: () => message({ title: '群聊列表获取失败' }) }
            })
        ])
    useImperativeHandle(ref, () => ({ render: renderContactsList }))
    useEffect(() => {
        // ajax初次获取
        renderContactsList().then(() => (initLoading = false))
        // 接管socket(好友列表)
        proxyHomeSocketByOnApi.friendsList = (list) => setFriendList(list)
        // 接管socket(群聊列表)
        proxyHomeSocketByOnApi.groupchatList = (list) => setGroupchatList(list)
    }, [])
    /** 联系人页面中的三个面板 */
    const panel = {
        /** 好友分组 */
        friendsGroup: <FriendsList list={friendList} />,
        /** 我的群聊 */
        groupchat: <GroupchatList list={groupchatList} />,
        /** 好友/群操作 */
        more: <More />
    }
    return (
        <>
            <HtmlComment>联系人</HtmlComment>
            <div className={`im-panel-section ${props.className ? props.className : ''}`}>
                <ul className="im-p-c-classify">
                    <li
                        className={currentArea === 'friendsGroup' ? 'im-p-c-c-highed' : ''}
                        onClick={() => setCurrentArea('friendsGroup')}>
                        我的分组
                    </li>
                    <li
                        className={currentArea === 'groupchat' ? 'im-p-c-c-highed' : ''}
                        onClick={() => setCurrentArea('groupchat')}>
                        我的群聊
                    </li>
                    <li
                        className={currentArea === 'more' ? 'im-p-c-c-highed' : ''}
                        onClick={() => setCurrentArea('more')}>
                        好友/群操作
                    </li>
                </ul>
                {initLoading ? (
                    <div className="im-p-s-loading">
                        <LoadingOutlined />
                    </div>
                ) : null}
                {panel[currentArea]}
            </div>
        </>
    )
})

export default Contacts
