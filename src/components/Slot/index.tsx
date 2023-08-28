import type { FC } from 'react'

import type { SlotType } from './interface'

/** Render Props */
const Slot: FC<SlotType> = (props) => props.children({ ...props })

export default Slot
