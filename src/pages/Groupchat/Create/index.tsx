import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, message as antdMessage } from 'antd'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'

import { useObjectState, useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'

import { createGroupchatHttpApi } from '@api/http/url/add/groupchat/create'

/** 输入内容的格式 */
const groupchatRules = [
    ['id', appRules.specific.id, 'ID必须为4~6位纯数字'],
    ['nickname', appRules.contentLimit['1_7'], '昵称不在1~7字符之间'],
    ['signature', appRules.contentLimit['1_100'], '简介不在1~100字符之间']
] as const

/** 创建群聊 */
const Create = () => {
    // 群聊信息
    const [info, setInfo] = useObjectState({ id: '', nickname: '', signature: '' })
    const navigate = useNavigate()
    /** 创建前对格式进行检查 */
    const before = useEventCallback(() => {
        const cur = groupchatRules.find(([key, rule]) => !rule(info[key].trim()))
        return cur ? message({ title: cur[2] }) : true
    })
    /** 发起创建群聊的请求 */
    const create = useEventCallback(() =>
        createGroupchatHttpApi.api(info)({
            succeed: {
                func: () => {
                    antdMessage.success('群聊创建成功')
                    navigate('/contacts')
                }
            },
            failed: { func: (title) => message({ title }) }
        })
    )
    const idList = useMemo(
        () => [
            {
                text: (
                    <Input
                        bordered={false}
                        value={info.id}
                        onChange={(ev) => setInfo({ id: ev.target.value })}
                        maxLength={6}
                    />
                )
            }
        ],
        [info.id]
    )
    const nicknameList = useMemo(
        () => [
            {
                text: (
                    <Input
                        bordered={false}
                        value={info.nickname}
                        onChange={(ev) => setInfo({ nickname: ev.target.value })}
                        maxLength={7}
                    />
                )
            }
        ],
        [info.nickname]
    )
    const signatureList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        bordered={false}
                        autoSize={{ minRows: 3 }}
                        value={info.signature}
                        onChange={(ev) => setInfo({ signature: ev.target.value })}
                        maxLength={100}
                    />
                ),
                description: `现有${info.signature.length}字`
            }
        ],
        [info.signature]
    )
    const createList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={createGroupchatHttpApi.url}
                        disabled="创建群聊"
                        before={before}
                        api={create}
                        loading={{ children: '正在创建' }}>
                        立即创建
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="创建群聊">
            <CommonRow title="群ID" list={idList} />
            <CommonRow title="群昵称" list={nicknameList} />
            <CommonRow title="群简介" list={signatureList} />
            <CommonRow list={createList} />
        </Sideslip>
    )
}

export default Create
