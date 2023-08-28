import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { message as antdMessage } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'
import Sideslip from '@components/Sideslip'

import { dissolveGroupchatHttpApi } from '@api/http/url/del/groupchat/dissolve'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'
import { getAvatarHttpApi } from '@api/http/url/get/account/avatar'

/** 解散群聊 */
const Dissolve = () => {
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const id = pathname.split('/')[3]
    const dissolve = () =>
        dissolveGroupchatHttpApi.api(id)({
            succeed: {
                func: () => {
                    antdMessage.success('群聊已解散')
                    navigate('/contacts')
                }
            },
            failed: { func: () => message({ title: '群聊解散失败' }) }
        })
    useEffect(() => {
        getAvatarHttpApi(id)({ succeed: { func: (avatar) => setAvatar(avatar) } })
        getNicknameHttpApi(id)({ succeed: { func: (nickname) => setNickname(nickname) } })
    }, [])
    return (
        <Sideslip title={`解散群聊(${id})`}>
            <CommonRow
                list={[{ text: <del>{nickname}</del>, icon: <img src={avatar} /> }]}
                comment={`解散群聊后，该群内的所有成员（包含管理员、普通成员）将会收到一条本群解散的通知，且该群内的所有数据将会被一并清空。并且该群聊id(${id})将被禁止使用，请悉知！！`}
            />
            <CommonRow
                title="谨慎操作"
                list={[
                    {
                        text: (
                            <TourAxios
                                name={dissolveGroupchatHttpApi.url}
                                disabled="解散群聊"
                                api={dissolve}
                                loading={{ children: '解散中' }}>
                                解散群聊
                            </TourAxios>
                        ),
                        primaryColor: true
                    }
                ]}
            />
        </Sideslip>
    )
}

export default Dissolve
