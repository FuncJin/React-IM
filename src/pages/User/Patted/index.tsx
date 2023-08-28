import { useState, useEffect, useMemo } from 'react'

import { Input } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import TourAxios from '@components/TourAxios'
import { message } from '@components/Message'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'

import { getPattedTextHttpApi } from '@api/http/url/get/account/pattedText'
import { setPattedTextHttpApi } from '@api/http/url/set/account/pattedText'

const uid = storage.get('react_im_user_id')

/** 用户自定义拍一拍文案 */
const Patted = () => {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const handleFinish = useEventCallback(() =>
        setPattedTextHttpApi.api(text)({
            succeed: { func: () => message({ title: text ? `已自定义为“${text}”` : '已清空文案' }) },
            failed: { func: () => message({ title: '修改失败' }) }
        })
    )
    const endList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={setPattedTextHttpApi.url}
                        disabled="修改拍一拍文案"
                        api={handleFinish}
                        loading={{ children: '自定义中' }}>
                        完成
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        []
    )
    useEffect(() => {
        getPattedTextHttpApi(uid)({
            succeed: { func: (text) => setText(text) },
            failed: { func: () => message({ title: '文案获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="拍一拍文案" isLoading={loading}>
            <CommonRow
                title="自定义你的拍一拍文案（头像双击动作）"
                list={[
                    {
                        text: (
                            <Input
                                bordered={false}
                                maxLength={7}
                                value={text}
                                onChange={(ev) => setText(ev.target.value)}
                            />
                        )
                    }
                ]}
                comment="tip: 输入为空则意味着清空文案"
            />
            <CommonRow list={endList} />
            <CommonRow title="预览" list={[{ text: `朋友拍了拍我${text ? `的${text}` : ''}` }]} />
        </Sideslip>
    )
}

export default Patted
