import { useState, useMemo, useEffect } from 'react'

import { Switch } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'
import { message } from '@components/Message'

import { appTheme } from '@utils/theme'
import { storage } from '@utils/storage'

const { changeTheme, defaultTheme, topicAdaptation, isDark } = appTheme

/** 主题颜色 */
const Colors = () => {
    const curSchemeOrder = storage.get('react_im_cur_theme_scheme_order')
    const curAutoOrder = storage.get('react_im_auto_theme')
    // 当前主题方案的编号
    const [schemeOrder, setSchemeOrder] = useState(curSchemeOrder ? curSchemeOrder : 0)
    // 当前自动切换的开关状态
    const [autoOpen, setAutoOpen] = useState(Boolean(curAutoOrder))
    // 切换主题方案的编号
    const changeThemeSchemeOrder = (state: number) => {
        setSchemeOrder(state)
        storage.set('react_im_cur_theme_scheme_order', state)
    }
    useEffect(() => {
        const proxy = topicAdaptation()
        // 主题切换时，也要切换编号
        proxy.dark.push(() => changeThemeSchemeOrder(1))
        proxy.light.push(() => changeThemeSchemeOrder(0))
    }, [])
    /** 切换主题 */
    const changeThemeScheme = (o: number) => {
        if (o === schemeOrder) return
        const [en, zh] = defaultTheme[o]
        changeTheme(en, o)
        setSchemeOrder(o)
        message({ title: `已切换至${zh}主题` })
    }
    const colorsList = useMemo(
        () => (
            <CommonRow
                title="平台目前支持以下主题方案"
                list={defaultTheme.map(([en, zh, bg], o) => ({
                    text: zh,
                    click: () => changeThemeScheme(o),
                    icon: (
                        <span
                            style={{
                                width: 24,
                                height: '100%',
                                backgroundColor: bg,
                                display: 'inline-block',
                                borderRadius: 4,
                                border: '1px solid #ccc'
                            }}
                        />
                    )
                }))}
                selected={schemeOrder}
            />
        ),
        [schemeOrder]
    )
    const autoList = useMemo(
        () => [
            {
                text: '跟随主题',
                description: (
                    <Switch
                        checked={autoOpen}
                        onChange={(open) => {
                            setAutoOpen(open)
                            storage.set('react_im_auto_theme', Number(open) as 0 | 1)
                            // 如果开启了自动跟随，则检查当前是否是深色模式
                            if (!(open && isDark())) return
                            // 如果是深色，则自动切换至深色主题
                            changeTheme('dark', 1)
                            changeThemeSchemeOrder(1)
                        }}
                    />
                )
            }
        ],
        [autoOpen]
    )
    return (
        <Sideslip title="主题颜色">
            <CommonRow title="是否希望自动跟随系统主题进行切换" list={autoList} />
            {colorsList}
        </Sideslip>
    )
}

export default Colors
