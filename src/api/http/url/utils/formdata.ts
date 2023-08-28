import { instance } from '@api/http/instance'

import type { RcFile } from 'antd/es/upload/interface'

import type { CustomObject } from '@interface/type'

/** 上传图片接口 */
export const formDataHttpApi = (url: string, file: RcFile, body?: CustomObject<string, string>) => {
    const data = new FormData()
    data.append('file', file)
    // 如果需要携带参数
    if (body) Object.keys(body).forEach((k) => data.append(k, body[k]))
    return instance({
        url,
        data,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
