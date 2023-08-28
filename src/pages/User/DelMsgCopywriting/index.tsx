import { useState, useEffect } from 'react'

import { message } from '@components/Message'
import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'

import { getSystemConfigsHttpApi } from '@api/http/url/get/system/defaultConfigs'
import { getDelTipHttpApi } from '@api/http/url/get/account/delTip'
import { setDelTipHttpApi } from '@api/http/url/set/account/delTip'

import type { CommonRowListType } from '@components/CommonRow/interface'

const nickname = storage.get('react_im_user_nickname')

/** 消息撤回文案 */
const DelMsgCopywriting = () => {
    // 当前选中的编号
    const [num, setNum] = useState(-1)
    // 系统默认的撤回文案列表
    const [delTip, setDelTip] = useState<CommonRowListType[]>([])
    // 标题的加载动画
    const [loading, setLoading] = useState(true)
    // 某个选项的加载动画
    const [opLoading, setOpLoading] = useState(true)
    /** 选中某个选项时触发 */
    const click = useEventCallback((idx: number, text: string) => {
        if (opLoading || idx === num) return
        const _delTip = [...delTip]
        // 为当前选项开启加载动画
        setDelTip(delTip.map((op, order) => (order !== idx ? op : { ...op, isLoading: true })))
        setNum(idx)
        setOpLoading(true)
        setDelTipHttpApi(idx)({
            succeed: {
                func: () => {
                    // eslint-disable-next-line
                    if (idx === 3) console.log(`${nickname}写下了一行console.log();`)
                }
            },
            failed: {
                func: () => {
                    setNum(num)
                    message({ title: '文案选择失败，请重试' })
                }
            },
            finally: () => {
                setOpLoading(false)
                setDelTip(_delTip)
            }
        })
    })
    useEffect(() => {
        Promise.all([getDelTipHttpApi()(), getSystemConfigsHttpApi.acc.delTip()()]).then(([curDelTip, config]) => {
            const delTip = config.data.map((text: string, idx: number) => {
                // 找出当前正在使用的撤回消息文案
                if (curDelTip.data === text) setNum(idx)
                // 渲染默认项
                return { text, click: () => click(idx, text) }
            })
            setDelTip(delTip)
            setLoading(false)
            setOpLoading(false)
        })
    }, [])
    return (
        <Sideslip title="消息撤回文案" isLoading={loading}>
            <CommonRow title="选择一个你喜欢的消息撤回文案" list={delTip} selected={num} />
            <CommonRow
                title="预览"
                list={[
                    {
                        text: `${nickname}撤回了一条消息${
                            delTip[num]?.text ? `${delTip[num].text !== '无' ? `，${delTip[num].text}` : ''}` : ''
                        }`,
                        more: false
                    }
                ]}
            />
        </Sideslip>
    )
}

export default DelMsgCopywriting
