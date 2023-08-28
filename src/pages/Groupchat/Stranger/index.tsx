import { useLocation } from 'react-router-dom'

import Empty from '@components/Empty'
import Sideslip from '@components/Sideslip'

/** 陌生成员页面 */
const Stranger = () => {
    const { pathname } = useLocation()
    return (
        <Sideslip title={`群(${pathname.split('/')[3]})`}>
            <Empty type="stranger" feedback="请先入群" />
        </Sideslip>
    )
}

export default Stranger
