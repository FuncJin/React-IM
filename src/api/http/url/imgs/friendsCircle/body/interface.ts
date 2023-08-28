import type { RcFile } from 'antd/es/upload/interface'

/** 发布朋友圈说说(图片形式)时携带的数据 */
export type FriendsCircleImgContentApiRequestData = {
    file: RcFile
    body: { content: string }
}
