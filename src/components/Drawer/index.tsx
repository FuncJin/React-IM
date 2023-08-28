import { domMethods } from '@utils/dom'

import type { DrawerType } from './interface'

/** 抽屉 */
export const drawer = (props: DrawerType) => domMethods.createElement('drawer', props)
