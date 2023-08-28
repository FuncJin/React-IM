import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Input, Button } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import UploadImg from '@components/Upload/Img'
import TourAxios from '@components/TourAxios'
import Sideslip from '@components/Sideslip'

import { useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'
import { defaultGroupchatInfo } from '@pages/Commons/Intro/Groupchat/utils/defaultInfo'

import { setGroupchatInfoHttpApi } from '@api/http/url/set/info/groupchat/self'
import { uploadGroupchatAvatarHttpApi } from '@api/http/url/imgs/groupchat/avatar/body'
import { uploadGroupchatBackgroundHttpApi } from '@api/http/url/imgs/groupchat/background/intro'
import { getIntroByGroupchatRelationHttpApi } from '@api/http/url/get/intro/groupchat'

/** 修改群聊资料(只有群主可以修改) */
const SetInfo = () => {
    const [info, setInfo] = useState({ ...defaultGroupchatInfo.info })
    const [loading, setLoading] = useState(true)
    // 群聊昵称、简介
    const [nickname, setNickname] = useState('')
    const [signature, setSignature] = useState('')
    /** 修改前检查格式 */
    const before = useEventCallback(() => {
        if (!appRules.contentLimit['1_7'](nickname)) return message({ title: '昵称不在1~7字符之间' })
        if (!appRules.contentLimit['1_50'](signature)) return message({ title: '简介不在1~50字符之间' })
        if (nickname === info.nickname && signature === info.signature) return message({ title: '你还未做出更改' })
        return true
    })
    const handleChange = useEventCallback(() =>
        setGroupchatInfoHttpApi.api({ id: info.id, nickname, signature })({
            succeed: { func: () => message({ title: '修改成功' }) },
            failed: { func: () => message({ title: '修改失败' }) }
        })
    )
    const submitLoading = useMemo(() => ({ children: '修改中' }), [])
    const nicknameList = useMemo(
        () => [
            {
                text: (
                    <Input
                        bordered={false}
                        maxLength={7}
                        value={nickname}
                        onChange={(ev) => setNickname(ev.target.value)}
                    />
                )
            }
        ],
        [nickname]
    )
    const signatureList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        bordered={false}
                        autoSize={{ minRows: 3 }}
                        maxLength={100}
                        value={signature}
                        onChange={(ev) => setSignature(ev.target.value)}
                    />
                ),
                description: `现有${signature.length}字`
            }
        ],
        [signature]
    )
    const { pathname } = useLocation()
    const id = pathname.split('/')[3]
    useEffect(() => {
        getIntroByGroupchatRelationHttpApi(id)({
            succeed: {
                func: (data) => {
                    setNickname(data.info.nickname)
                    setSignature(data.info.signature)
                    setInfo(data.info)
                }
            },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title="编辑群聊信息" isLoading={loading}>
            <div className="im-panel-intro-bg-img-radius">
                <div className="im-panel-intro-container">
                    <div className="im-p-i-c-cover">
                        <UploadImg
                            title={{ hover: '上传主页背景图' }}
                            url={info.background}
                            imgApi={(file) =>
                                uploadGroupchatBackgroundHttpApi({ file, id: info.id })({
                                    succeed: {
                                        func: (url) => {
                                            setInfo({ ...info, background: url })
                                            message({ title: '已更新主页背景图' })
                                        }
                                    },
                                    failed: { func: () => message({ title: '群背景图上传失败' }) }
                                })
                            }
                        />
                    </div>
                </div>
                <div className="im-panel-intro-basis-info">
                    <div className="im-p-i-b-i-header">
                        <div className="im-p-i-b-i-h-avatar im-p-i-b-i-h-avatar-set">
                            <UploadImg
                                title={{ hover: '上传头像' }}
                                url={info.avatar}
                                imgApi={(file) =>
                                    uploadGroupchatAvatarHttpApi({ file, id: info.id })({
                                        succeed: {
                                            func: (url) => {
                                                setInfo({ ...info, avatar: url })
                                                message({ title: '已更新头像' })
                                            }
                                        },
                                        failed: { func: () => message({ title: '群头像上传失败' }) }
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="im-panel-intro-set-basis-info">
                <CommonRow title="昵称（必填）" list={nicknameList} />
                <CommonRow title="群简介（必填）" list={signatureList} />
            </div>
            <Button type="primary" block>
                <TourAxios
                    name={setGroupchatInfoHttpApi.url}
                    disabled="修改群聊资料"
                    before={before}
                    api={handleChange}
                    loading={submitLoading}>
                    确认修改
                </TourAxios>
            </Button>
        </Sideslip>
    )
}

export default SetInfo
