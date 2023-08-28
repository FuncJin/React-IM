import { useState, useEffect, memo } from 'react'

import { Select } from 'antd'

import { $province } from './province'
import { $city } from './city'

import type { FC } from 'react'

import type { CascaderType } from './interface'

import './index.less'

/** 地区选择器 */
const Cascader: FC<CascaderType> = ({ prov, city, onChange }) => {
    // 当前选择的省
    const [_prov, setProv] = useState(prov)
    // 当前选择的市
    const [_city, setCity] = useState(city)
    useEffect(() => {
        setProv(prov)
    }, [prov])
    useEffect(() => {
        setCity(city)
    }, [city])
    return (
        <div id="im-cascader-menus">
            <Select
                className="im-cascader-menus-select"
                placement="topLeft"
                bordered={false}
                options={$province}
                value={_prov}
                onChange={(prov) => {
                    setProv(prov)
                    setCity('')
                    onChange(prov, '')
                }}
                getPopupContainer={() => document.querySelector('#im-cascader-menus')!}
            />
            <Select
                className="im-cascader-menus-select"
                placement="topLeft"
                bordered={false}
                options={($city as any)[_prov]}
                value={_city}
                onChange={(city) => {
                    setCity(city)
                    onChange(_prov, city)
                }}
                getPopupContainer={() => document.querySelector('#im-cascader-menus')!}
            />
        </div>
    )
}

export default memo(Cascader)
