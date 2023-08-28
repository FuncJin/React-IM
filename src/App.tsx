import { ConfigProvider } from 'antd'

import RoutesGuard from '@router/router'

import Panel from '@components/Panel'

import { routeConfigs } from '@router/configs'

import '@style/commons/template.less'
import '@style/commons/keyframes.less'
import '@style/media/index.less'
import '@style/reset/html.less'
import '@style/reset/antd.less'
import '@style/app.less'

import '@style/theme/normal.css'
import '@style/theme/dark.css'

export default () => (
    <ConfigProvider autoInsertSpaceInButton={false}>
        <Panel>
            <RoutesGuard {...routeConfigs} />
        </Panel>
    </ConfigProvider>
)
