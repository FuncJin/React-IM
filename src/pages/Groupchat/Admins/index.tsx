import { useLocation } from 'react-router-dom'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'

/** 管理员页面 */
const Admins = () => {
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    return (
        <Sideslip title="管理员">
            <CommonRow list={[{ text: '查看成员列表', to: { pathname: `/groupchat/memberList/${id}` }, more: true }]} />
            <CommonRow list={[{ text: '退出群聊', to: { pathname: `/groupchat/quit/${id}` }, more: true }]} />
        </Sideslip>
    )
}

export default Admins
