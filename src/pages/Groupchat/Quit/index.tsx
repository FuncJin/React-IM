import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { message as antdMessage } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'
import TourAxios from '@components/TourAxios'

import { quitGroupchatHttpApi } from '@api/http/url/quit/groupchat'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getAvatarHttpApi } from '@api/http/url/get/account/avatar'

/** 退出群聊 */
const Quit = () => {
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const id = pathname.split('/')[3]
    const quit = () =>
        quitGroupchatHttpApi.api(id)({
            succeed: {
                func: () => {
                    antdMessage.success('已退出')
                    navigate('/contacts')
                }
            },
            failed: { func: () => message({ title: '退出失败，请重试' }) }
        })
    useEffect(() => {
        getAvatarHttpApi(id)({ succeed: { func: (avatar) => setAvatar(avatar) } })
        getNicknameHttpApi(id)({ succeed: { func: (nickname) => setNickname(nickname) } })
    }, [])
    return (
        <Sideslip title={`退出群聊(${id})`}>
            <CommonRow
                list={[{ text: <del>{nickname}</del>, icon: <img src={avatar} /> }]}
                comment="退出群聊后，群主及管理员会收到你的退群通知"
            />
            <CommonRow
                title="谨慎操作"
                list={[
                    {
                        text: (
                            <TourAxios
                                name={quitGroupchatHttpApi.url}
                                disabled="退出群聊"
                                api={quit}
                                loading={{ children: '正在退出' }}>
                                退出群聊
                            </TourAxios>
                        ),
                        primaryColor: true
                    }
                ]}
            />
        </Sideslip>
    )
}

export default Quit
