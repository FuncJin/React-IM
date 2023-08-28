import { useLocation } from 'react-router-dom'

import Empty from '@components/Empty'
import Sideslip from '@components/Sideslip'

/** 双方不是好友关系时展示的页面 */
const Stranger = () => {
    const { pathname } = useLocation()
    return (
        <Sideslip title={`陌生人(${pathname.split('/')[3]})`}>
            <Empty type="stranger" feedback="你们目前还不是好友" />
        </Sideslip>
    )
}

export default Stranger
