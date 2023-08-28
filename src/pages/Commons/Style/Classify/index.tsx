import { Outlet } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

/** 主题样式 */
const Classify = () => (
    <>
        <Sideslip title="主题样式">
            <CommonRow
                title="主题相关"
                list={[{ text: '主题颜色', to: { pathname: '/settings/style/colors' }, more: true }]}
            />
            <CommonRow
                title="样式相关"
                list={[
                    { text: '消息炫彩字', to: { pathname: '/settings/style/coloursText' }, more: true },
                    { text: '首屏欢迎特效', to: { pathname: '/settings/style/confetti' }, more: true }
                ]}
            />
            <CommonRow
                list={[
                    { text: '自定义面板尺寸', to: { pathname: '/settings/style/customPanelSize' }, more: true },
                    { text: '大屏主页背景', to: { pathname: '/settings/style/background' }, more: true }
                ]}
            />
        </Sideslip>
        <Outlet />
    </>
)

export default Classify
