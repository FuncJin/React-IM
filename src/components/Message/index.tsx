import { domMethods } from '@utils/dom'

import type { MessageType } from './interface'

/** 弹出消息提示 */
export const message = (props: MessageType) => domMethods.createElement('message', props)
