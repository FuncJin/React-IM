import { useState } from 'react'

import { useEventCallback } from './useEventCallback'

import type { CustomValueByStringObject } from '@interface/type'

/** 更新对象类型的State */
export const useObjectState = <T extends CustomValueByStringObject<any>>(val: T) => {
    const [_val, _setVal] = useState(val)
    const setVal = useEventCallback(<V extends { [U in keyof T]?: T[U] } | T>(val: V) => _setVal({ ..._val, ...val }))
    return [_val, setVal] as const
}
