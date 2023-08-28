import { domMethods } from '@utils/dom'

import type { PreviewImgType } from './interface'

/** 全局预览图片 */
export const previewImg = (props: PreviewImgType) => domMethods.createElement('previewImg', props)
