import { useState, useEffect, useMemo } from 'react'

import { Input, message as antdMessage } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

import { useEventCallback } from '@hooks'

import { storage } from '@utils/storage'
import { getCurDeviceType } from '@utils/device/curDeviceType'

const rootDom = document.querySelector('#root') as HTMLDivElement
const sizeReg = /^\d+(px|%|vw|vh|em|rem)$/

/** 自定义面板尺寸 */
const CustomPanelSize = () => {
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const custom = useEventCallback(() => {
        if (getCurDeviceType() !== 'pc') return antdMessage.error('只支持在PC端自定义')
        if (width && !sizeReg.test(width)) return antdMessage.error('宽度不符合规则')
        if (height && !sizeReg.test(height)) return antdMessage.error('高度不符合规则')
        if (!width && !height) return antdMessage.warn('至少定义宽度与高度的一种')
        rootDom.style.width = width
        rootDom.style.height = height
        storage.set('react_im_custom_panel_size', { width, height })
        antdMessage.success('自定义尺寸已生效')
    })
    const reset = () => {
        if (getCurDeviceType() !== 'pc') return antdMessage.error('只支持在PC端自定义')
        const { width, height } = window.getComputedStyle(rootDom)
        if (width === '375px' && height === '667px') return antdMessage.warn('已经是默认尺寸了~')
        rootDom.style.width = ''
        rootDom.style.height = ''
        storage.remove('react_im_custom_panel_size')
        setWidth('')
        setHeight('')
        antdMessage.success('已重置')
    }
    const widthList = useMemo(
        () => [{ text: <Input bordered={false} value={width} onChange={(ev) => setWidth(ev.target.value)} /> }],
        [width]
    )
    const heightList = useMemo(
        () => [{ text: <Input bordered={false} value={height} onChange={(ev) => setHeight(ev.target.value)} /> }],
        [height]
    )
    const customList = useMemo(() => [{ text: '确定更改', click: custom }], [])
    const resetList = useMemo(() => [{ text: '重置面板尺寸', click: reset, primaryColor: true }], [])
    useEffect(() => {
        const panel = storage.get('react_im_custom_panel_size')
        // 如果未自定义面板尺寸
        if (!panel) return
        // 修改面板尺寸
        const { width, height } = panel
        setWidth(width)
        setHeight(height)
    }, [])
    return (
        <Sideslip title="自定义面板尺寸">
            <CommonRow title="自定义面板尺寸指的是在屏幕宽度大于768px时所应用的宽度与高度，你可以只定义宽度或高度，支持的单位有px、%、vw、vh、em、rem。" />
            <CommonRow title="输入面板宽度，例如“375px”" list={widthList} />
            <CommonRow title="输入面板高度，例如“90%”" list={heightList} />
            <CommonRow comment="确定好要自定义的尺寸后，单击此处以应用" list={customList} />
            <CommonRow comment="或者你也可以重置面板尺寸，重置后的宽度为375px，高度为667px" list={resetList} />
        </Sideslip>
    )
}

export default CustomPanelSize
