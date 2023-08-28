import type { IntroGroupchat } from '@api/http/url/get/intro/groupchat/interface'

export const defaultGroupchatInfo: IntroGroupchat = {
    type: 'stranger',
    info: {
        id: '',
        nickname: '',
        avatar: '',
        background: '',
        signature: '',
        host: {
            id: '',
            nickname: '',
            avatar: ''
        },
        time: 0,
        totals: 0,
        tags: {}
    }
}
