import { useState } from 'react'

/** 强制更新组件 */
export const useForceUp = () => {
    const [, _setVal] = useState(0)
    return [undefined, () => _setVal(Math.random())] as const
}
