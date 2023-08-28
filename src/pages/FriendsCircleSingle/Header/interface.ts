export type Header = {
    url: {
        avatar: string
        bg: string
    }
    limit: {
        /** 总共多少条说说 */
        content: number
        /** 总共多少访客 */
        visitors: number | string
    }
    nickname: string
}
