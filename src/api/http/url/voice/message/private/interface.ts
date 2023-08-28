import type { RcFile } from 'antd/es/upload/interface'

export type VoiceMsgApiRequestData = {
    uid: string
    oid: string
    file: RcFile
}
