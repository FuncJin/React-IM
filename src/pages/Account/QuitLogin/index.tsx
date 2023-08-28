import { useNavigate } from 'react-router-dom'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { storage } from '@utils/storage'

import { quitLoginHttpApi } from '@api/http/url/quit/login'

import { websocket } from '@api/socket/connect'

/** 退出登录 */
const QuitLogin = () => {
    const navigate = useNavigate()
    /** 发送退出登录的请求 */
    const quit = () =>
        quitLoginHttpApi.api()({
            succeed: {
                func() {
                    // 移除本地一些必需token
                    storage.remove('react_im_token')
                    // 跳转至首页
                    navigate('/')
                    // 主动断开ws连接
                    websocket.close()
                }
            },
            failed: { func: () => message({ title: '退出失败，请重试' }) }
        })
    return (
        <Sideslip title="退出登录">
            <CommonRow
                list={[
                    {
                        text: (
                            <TourAxios
                                name={quitLoginHttpApi.url}
                                disabled="退出登录"
                                api={quit}
                                loading={{ children: '正在退出' }}>
                                退出登录
                            </TourAxios>
                        ),
                        primaryColor: true
                    }
                ]}
                comment="由于token会在各设备间共享，所以在你退出后，当前账号所对应的token会立即失效（其影响的范围包括但不仅限于当前设备）。若你已在其它设备登录了该账号，请谨慎操作"
            />
        </Sideslip>
    )
}

export default QuitLogin
