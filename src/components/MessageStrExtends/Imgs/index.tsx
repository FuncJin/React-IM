import UploadImg from '@components/Upload/Img'

import type { FC } from 'react'

import type { ImgsType } from './interface'

import './index.less'

/** 图片上传入口 */
const Imgs: FC<ImgsType> = ({ img }) => (
    <div className="im-message-str-extends-imgs">
        <UploadImg {...img} />
    </div>
)

export default Imgs
