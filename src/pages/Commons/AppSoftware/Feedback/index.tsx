import { useMemo, useState } from 'react'

import { Input } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'
import TourAxios from '@components/TourAxios'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'
import { storage } from '@utils/storage'

import { commitFeedbackHttpApi } from '@api/http/url/set/account/feedbackContent'

/** 提交成功后的反馈 */
const text = { bug: 'bug已记录', suggest: '建议已记录', complaint: '违规行为已记录' }
/** 每个提交类型所对应的文案 */
const CommonRowText = { bug: '刻不容缓，提交bug', suggest: '点晴之笔，提交建议', complaint: '正气凛然，举报违规行为' }

/** 反馈的类型(建议、bug、举报) */
const CommonRowTextIndex = ['suggest', 'bug', 'complaint']

const uid = storage.get('react_im_user_id')

/** 平台反馈 */
const Feedback = () => {
    // 反馈的类型
    const [type, setType] = useState<keyof typeof CommonRowText>('suggest')
    // 反馈的内容
    const [content, setContent] = useState('')
    // 如果是举报时，则other必须为被举报的id
    // 如果是bug或建议时，id会是用户自己的id
    const [other, setOther] = useState(uid)
    // 是否正在提交中
    const [loading, setLoading] = useState(false)
    /** 提交前对格式进行检查 */
    const before = useEventCallback(() => {
        if (!(content.length >= 30 && content.length <= 200))
            return message({ title: '你输入的内容不在30~200字符之间' })
        if (type !== 'complaint') return true
        // 类型为举报时，对id的格式进行检查
        return appRules.specific.id(other) ? true : message({ title: '你所举报的ID不符合规则' })
    })
    /** 发送本次反馈内容 */
    const sendFeedBack = useEventCallback(() => {
        // 出现加载动画
        setLoading(true)
        return commitFeedbackHttpApi.api({ type, content, other })({
            succeed: {
                func: () =>
                    message({
                        title: text[type],
                        Children: '开发者看到后会在第一时间与你取得联系，感谢你为此项目做出的贡献！'
                    })
            },
            failed: {
                func: () =>
                    message({
                        title: '提交失败，请重试',
                        Children: type === 'complaint' ? '可能是由于你举报的ID不是真实有效的ID而导致的' : ''
                    })
            },
            finally: () => setLoading(false)
        })
    })
    const contentList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        bordered={false}
                        autoSize={{ minRows: 2, maxRows: 10 }}
                        maxLength={200}
                        value={content}
                        onChange={(ev) => setContent(ev.target.value)}
                    />
                ),
                description: `现有${content.length}字`
            }
        ],
        [content]
    )
    const complaintList = useMemo(
        () => [
            {
                text: (
                    <Input
                        placeholder="请确保ID完全正确！"
                        bordered={false}
                        maxLength={6}
                        value={other}
                        onChange={(ev) => setOther(ev.target.value)}
                    />
                )
            }
        ],
        [other]
    )
    const typeList = useMemo(
        () => [
            {
                text: '建议',
                click: () => {
                    // 等待上一次提交完成后才能发起下一次提交
                    if (loading) return
                    setOther(uid)
                    setType('suggest')
                }
            },
            {
                text: 'bug',
                click: () => {
                    if (loading) return
                    setOther(uid)
                    setType('bug')
                }
            },
            {
                text: '举报用户/群聊',
                click: () => {
                    if (loading) return
                    setOther('')
                    setType('complaint')
                }
            }
        ],
        [loading]
    )
    const typeSelected = useMemo(() => CommonRowTextIndex.findIndex((t) => t === type), [type])
    const submitList = useMemo(
        () => [
            {
                text: (
                    <TourAxios
                        name={commitFeedbackHttpApi.url}
                        disabled="平台反馈"
                        before={before}
                        api={sendFeedBack}
                        loading={{ children: '提交中' }}>
                        {CommonRowText[type]}
                    </TourAxios>
                ),
                primaryColor: true
            }
        ],
        [type]
    )
    return (
        <Sideslip title="反馈渠道">
            <CommonRow title="在下方输入反馈内容，最多200字，最少30字" list={contentList} />
            {type === 'complaint' ? <CommonRow title="在这里输入被举报的用户ID或群聊ID" list={complaintList} /> : null}
            <CommonRow title="选择本次提交的类型" list={typeList} selected={typeSelected} />
            <CommonRow list={submitList} />
        </Sideslip>
    )
}

export default Feedback
