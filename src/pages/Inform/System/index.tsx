import { Outlet } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

/** 平台通知 */
const System = () => (
    <>
        <Sideslip title="平台通知">
            <CommonRow
                list={[
                    { text: '未读消息提醒', to: { pathname: '/settings/systemInform/unReadMessageRemind' }, more: true }
                ]}
            />
            <CommonRow
                list={[{ text: '站内信', to: { pathname: '/settings/systemInform/message' }, more: true }]}
                comment="站内信是开发者与你联系的主要方式"
            />
        </Sideslip>
        <Outlet />
    </>
)

export default System
