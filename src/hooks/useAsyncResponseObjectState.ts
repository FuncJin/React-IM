import { useState } from 'react'

import { useEventCallback } from './useEventCallback'

import type { CustomValueByStringObject } from '@interface/type'

/** Response Object State */
export const useAsyncResponseObjectState = <T extends CustomValueByStringObject<any>>(val: T) => {
    const [_val, _setVal] = useState(val)
    const setVal = useEventCallback(<V extends { [U in keyof T]?: T[U] } | T>(val: V) => _setVal({ ..._val, ...val }))
    return [_val, setVal] as const
}
