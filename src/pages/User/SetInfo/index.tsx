import { useMemo, useEffect } from 'react'

import { Input, InputNumber, Button } from 'antd'

import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import UploadImg from '@components/Upload/Img'
import Cascader from '@components/Cascader'
import TourAxios from '@components/TourAxios'
import Sideslip from '@components/Sideslip'

import { useObjectState, useEventCallback } from '@hooks'

import { appRules } from '@utils/submitRules'
import { storage } from '@utils/storage'
import { defaultUserInfo } from '@pages/Commons/Intro/User/utils/defaultInfo'

import { setUserInfoHttpApi } from '@api/http/url/set/info/user/self'
import { uploadUserAvatarHttpApi } from '@api/http/url/imgs/user/avatar/body'
import { uploadHomePageBackgroundHttpApi } from '@api/http/url/imgs/user/background/homePage'
import { getIntroByFriendRelationHttpApi } from '@api/http/url/get/intro/friend'

const uid = storage.get('react_im_user_id')

/** 自己的个人主页(修改个人资料) */
const SetInfo = () => {
    // 个人信息
    const [info, setInfo] = useObjectState({ ...defaultUserInfo.info })
    /** 修改地区 */
    const handleCascader = useEventCallback((province: string, city: string) =>
        setInfo({ birthplace: { province, city } })
    )
    /** 提交前对格式进行检查 */
    const before = useEventCallback(() => {
        if (!appRules.contentLimit['1_7'](info.nickname)) return message({ title: '昵称不在1~7字符之间' })
        if (!(info.age >= 16 && info.age <= 100)) return message({ title: '年龄区间不符合规则' })
        if (!info.birthplace.province) return message({ title: '地区中的省份不符合规则' })
        if (!info.birthplace.city) return message({ title: '地区中的城市不符合规则' })
        if (!appRules.contentLimit['1_50'](info.signature)) return message({ title: '个性签名不在1~50字符之间' })
        return true
    })
    const handleChange = useEventCallback(() => {
        const _data = {
            nickname: info.nickname,
            age: info.age,
            sex: info.sex,
            signature: info.signature,
            birthplace: info.birthplace
        }
        return setUserInfoHttpApi.api(_data as any)({
            succeed: {
                func: () => {
                    storage.set('react_im_user_nickname', info.nickname)
                    message({ title: '已更新个人信息' })
                }
            },
            failed: { func: () => message({ title: '更新失败' }) }
        })
    })
    const submitLoading = useMemo(() => ({ children: '修改中' }), [])
    const nicknameList = useMemo(
        () => [
            {
                text: (
                    <Input
                        bordered={false}
                        maxLength={7}
                        value={info.nickname}
                        onChange={(ev) => setInfo({ nickname: ev.target.value })}
                    />
                )
            }
        ],
        [info.nickname]
    )
    const sexList = useMemo(
        () => [
            { text: '女', click: () => setInfo({ sex: '女' }) },
            { text: '男', click: () => setInfo({ sex: '男' }) }
        ],
        []
    )
    const sexSelected = useMemo(() => (info.sex === '女' ? 0 : 1), [info.sex])
    const ageList = useMemo(
        () => [
            {
                text: (
                    <InputNumber
                        style={{ width: '100%' }}
                        bordered={false}
                        max={199}
                        min={16}
                        value={info.age}
                        onChange={(age) => setInfo({ age: age! })}
                    />
                )
            }
        ],
        [info.age]
    )
    const cascaderList = useMemo(
        () => [
            {
                text: <Cascader prov={info.birthplace.province} city={info.birthplace.city} onChange={handleCascader} />
            }
        ],
        [info.birthplace.province, info.birthplace.city]
    )
    const signatureList = useMemo(
        () => [
            {
                text: (
                    <Input.TextArea
                        bordered={false}
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        maxLength={100}
                        value={info.signature}
                        onChange={(ev) => setInfo({ signature: ev.target.value })}
                    />
                )
            }
        ],
        [info.signature]
    )
    useEffect(() => {
        getIntroByFriendRelationHttpApi(uid)({
            succeed: { func: (data) => setInfo(data.info) },
            failed: { func: () => message({ title: '主页信息获取失败' }) }
        })
    }, [])
    return (
        <Sideslip title="编辑个人资料" isLoading={!info.id}>
            <div className="im-panel-intro-bg-img-radius">
                <div className="im-panel-intro-container">
                    <div className="im-p-i-c-cover">
                        <UploadImg
                            title={{ hover: '上传主页背景图' }}
                            url={info.background}
                            imgApi={(file) =>
                                uploadHomePageBackgroundHttpApi(file)({
                                    succeed: {
                                        func: (url) => {
                                            message({ title: '已更新主页背景图' })
                                            setInfo({ ...info, background: url })
                                        }
                                    },
                                    failed: { func: () => message({ title: '主页背景图更新失败' }) }
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
                                    uploadUserAvatarHttpApi(file)({
                                        succeed: {
                                            func: (url) => {
                                                storage.set('react_im_user_avatar', url)
                                                setInfo({ ...info, avatar: url })
                                                message({ title: '已更新个人头像' })
                                            }
                                        },
                                        failed: { func: () => message({ title: '头像更新失败' }) }
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="im-panel-intro-set-basis-info">
                <CommonRow title="昵称（必填）" list={nicknameList} />
                <CommonRow title="性别（必选）" list={sexList} selected={sexSelected} />
                <CommonRow title="年龄（必填）" list={ageList} />
                <CommonRow title="地区（必填）" list={cascaderList} />
                <CommonRow title="个性签名（必填）" list={signatureList} />
            </div>
            <Button type="primary" block>
                <TourAxios
                    before={before}
                    name={setUserInfoHttpApi.url}
                    disabled="修改个人资料"
                    api={handleChange}
                    loading={submitLoading}>
                    确认修改
                </TourAxios>
            </Button>
        </Sideslip>
    )
}

export default SetInfo
