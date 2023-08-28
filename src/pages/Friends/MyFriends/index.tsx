import { useLocation } from 'react-router-dom'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'

/** 双方是好友关系时展示的页面 */
const MyFriends = () => {
    const { pathname } = useLocation()
    const id = pathname.split('/')[2]
    return (
        <Sideslip title="我的好友">
            <CommonRow
                list={[
                    { text: '设置分组', to: { pathname: `/friends/changeGroup/${id}` }, more: true },
                    { text: '修改备注', to: { pathname: `/friends/changeAlias/${id}` }, more: true }
                ]}
            />
            <CommonRow
                list={[{ text: '删除好友', to: { pathname: `/friends/delete/${id}` }, primaryColor: true, more: true }]}
            />
        </Sideslip>
    )
}

export default MyFriends
