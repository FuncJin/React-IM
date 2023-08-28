import { getSectionRandom } from '@utils/random'

import './index.less'

/** 以彩色字的形式渲染一段文字(html格式的字符串) */
const RenderColoursText = (text: string) =>
    `<span class="im-render-text-colours-${getSectionRandom(1, 7)}">${text}</span>`

export default RenderColoursText
