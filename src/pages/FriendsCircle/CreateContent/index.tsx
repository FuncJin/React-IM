import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from 'antd'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import MessageStrExtends from '@components/MessageStrExtends'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'

import { createFriendsCircleTextContentHttpApi } from '@api/http/url/add/friendsCircle/textContent'
import { createFriendsCircleImgContentHttpApi } from '@api/http/url/imgs/friendsCircle/body'
import { createFriendsCircleVoiceContentHttpApi } from '@api/http/url/voice/friendsCircle/body'

import type { RcFile } from 'antd/es/upload/interface'

/** 发布朋友圈说说 */
const CreateContent = () => {
    // 说说内容
    const [content, setContent] = useState('')
    // 要携带的图片
    const [img, setImg] = useState<RcFile>()
    // 要携带的语音
    const [voice, setVoice] = useState()
    const navigate = useNavigate()
    const config = {
        succeed: { func: () => message({ title: '发布成功', options: [{ text: '确定', click: () => navigate(-1) }] }) },
        failed: { func: (title: string) => message({ title }) }
    }
    /** 发布前检查格式 */
    const before = useEventCallback(() =>
        appRules.contentLimit['1_150'](content) ? true : message({ title: '内容不在1~150字符之间' })
    )
    /** 发送请求(携带图片与不携带图片，使用两种api) */
    const createContent = useEventCallback(() => {
        // 携带了图片
        if (img) return createFriendsCircleImgContentHttpApi({ file: img, body: { content } })(config)
        // 携带了语音
        if (voice) return createFriendsCircleVoiceContentHttpApi({ file: voice, body: { content } })(config)
        // 未携带图片、语音
        return createFriendsCircleTextContentHttpApi.api(content)(config)
    })
    /** 输入表情时触发 */
    const onEmoji = useEventCallback((emoji) => setContent(content + emoji))
    const contentList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        placeholder="输入内容"
                        maxLength={150}
                        autoSize={{ minRows: 4, maxRows: 10 }}
                        bordered={false}
                        showCount={false}
                        onChange={(ev) => setContent(ev.target.value)}
                        value={content}
                    />
                ),
                description: `现有${content.length}字`
            }
        ],
        [content]
    )
    const styleList = useMemo(
        () => [
            {
                text: (
                    <MessageStrExtends
                        emoji={{ onEmoji }}
                        img={{
                            url: img ? URL.createObjectURL(img) : '',
                            customUploadFunc: (img) => setImg(img),
                            title: {
                                hover: '添加图片',
                                upload: '要暂时添加此图片吗？（图片只会在发布之后才会上传）'
                            },
                            cancelText: '我再想想'
                        }}
                        voice={{ succeed: (voice) => setVoice(voice) }}
                    />
                )
            }
        ],
        [img]
    )
    const createList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={createFriendsCircleTextContentHttpApi.url}
                        disabled="发布说说"
                        before={before}
                        api={createContent}
                        loading={{ children: '正在发布' }}>
                        立即发布
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    return (
        <Sideslip title="发布朋友圈说说">
            <CommonRow list={contentList} comment="最多150字符" />
            <CommonRow list={styleList} comment="图片与语音，只能上传其中之一。（图片的优先级默认大于语音）" />
            <CommonRow list={createList} />
        </Sideslip>
    )
}

export default CreateContent
