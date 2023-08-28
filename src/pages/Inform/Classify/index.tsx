import { Outlet } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import './index.less'

/** 与我有关的通知(通知分类) */
const Classify = () => (
    <>
        <Sideslip title="与我有关的通知">
            <CommonRow
                title="好友相关"
                list={[{ text: '好友申请', to: { pathname: '/inform/friendsRequest' }, more: true }]}
            />
            <CommonRow
                title="群聊相关"
                list={[
                    { text: '群聊申请', to: { pathname: '/inform/groupchatRequest' }, more: true },
                    { text: '退群通知', to: { pathname: '/inform/quit' }, border: false, more: true },
                    { text: '群聊解散通知', to: { pathname: '/inform/dissolve' }, border: false, more: true },
                    { text: '管理员变更通知', to: { pathname: '/inform/changeAdmins' }, border: false, more: true },
                    { text: '踢出群聊通知', to: { pathname: '/inform/kick' }, border: false, more: true }
                ]}
            />
            <CommonRow
                title="主页相关"
                list={[{ text: '主页点赞通知', to: { pathname: '/inform/liked' }, more: true }]}
            />
            <CommonRow
                title="朋友圈相关"
                list={[{ text: '朋友圈通知', to: { pathname: '/inform/friendsCircle' }, more: true }]}
            />
        </Sideslip>
        <Outlet />
    </>
)

export default Classify
