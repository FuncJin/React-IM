import type { CustomKeyByObject } from '@interface/type'

export type CommentApiRequestData = CustomKeyByObject<'use' | 'oid' | 'key' | 'content'> & {
    type: 'comment' | 'reply'
}
