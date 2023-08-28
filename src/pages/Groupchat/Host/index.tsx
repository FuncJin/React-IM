import { useLocation } from 'react-router-dom'

import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'

/** 群主页面 */
const Host = () => {
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    return (
        <Sideslip title="群主">
            <CommonRow
                list={[
                    { text: '查看成员列表', to: { pathname: `/groupchat/memberList/${id}` }, more: true },
                    { text: '编辑群聊资料', to: { pathname: `/groupchat/setInfo/${id}` }, more: true }
                ]}
            />
            <CommonRow
                list={[
                    { text: '解散群聊', to: { pathname: `/groupchat/dissolve/${id}` }, primaryColor: true, more: true }
                ]}
            />
        </Sideslip>
    )
}

export default Host
