import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { message as antdMessage } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'
import Sideslip from '@components/Sideslip'

import { delFriendHttpApi } from '@api/http/url/del/friend/delete'
import { getAvatarHttpApi } from '@api/http/url/get/account/avatar'
import { getNicknameHttpApi } from '@api/http/url/get/nickname/body'

/** 删除好友 */
const Delete = () => {
    const [avatar, setAvatar] = useState('')
    const [nickname, setNickname] = useState('')
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    useEffect(() => {
        getNicknameHttpApi(id)({
            succeed: {
                func: (nickname) => {
                    setNickname(nickname)
                    getAvatarHttpApi(id)({ succeed: { func: (avatar) => setAvatar(avatar) } })
                }
            }
        })
    }, [])
    const del = () =>
        delFriendHttpApi.api(id)({
            succeed: {
                func: () => {
                    antdMessage.success('已删除')
                    navigate('/contacts')
                }
            },
            failed: { func: () => message({ title: '删除失败，请重试' }) }
        })
    return (
        <Sideslip title="删除好友" isLoading={!avatar}>
            <CommonRow
                list={[
                    {
                        icon: <img className="im-img-avatar-radius" src={avatar} />,
                        text: (
                            <TourAxios
                                name={delFriendHttpApi.url}
                                disabled="删除好友"
                                api={del}
                                loading={{ children: '正在删除' }}>
                                <del>{nickname}</del>
                            </TourAxios>
                        )
                    }
                ]}
                comment="你确定要删除该好友吗？若确定，请单击此按钮，单击后将立即删除（不会弹出对话框进行警示）。请谨慎操作"
            />
        </Sideslip>
    )
}

export default Delete
