import { Outlet } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { storage } from '@utils/storage'

const uid = storage.get('react_im_user_id')

/** 朋友圈(/friendsCircle)的弹出选项(More) */
const More = () => (
    <>
        <Sideslip title="朋友圈相关">
            <CommonRow list={[{ text: '发布动态', to: { pathname: '/friendsCircle/more/create' }, more: true }]} />
            <CommonRow
                list={[{ text: '查看与我有关的通知', to: { pathname: '/friendsCircle/more/inform' }, more: true }]}
                comment="包含我发出的动作(点赞、评论等)以及别人对我发出的动作(点赞、评论等)"
            />
            <CommonRow list={[{ text: '我的朋友圈主页', to: { pathname: `/friendsCircle/${uid}` }, more: true }]} />
        </Sideslip>
        <Outlet />
    </>
)

export default More
