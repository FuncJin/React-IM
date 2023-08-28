import type { ReactNode, FC } from 'react'

/** 子类型(可以是React节点，也可以是函数式组件) */
export type ChildrenType = ReactNode | FC<any>

/** TourAxios配置项 */
type TourAxios = {
    /**
     * 当前Http请求所对应的路径
     *
     * 如果配置了该项，则代表由TourAxios来接管当前http请求的四个状态：开发中、维护中、将废弃、有异常
     */
    name?: string
    /**
     * 在配置了name选项后，且当前接口处于不可用的状态时，要渲染的内容
     */
    disabled?: string
    /** 在请求函数之前做些什么（将根据返回结果来决定是否执行请求函数） */
    before?: () => void | boolean | Promise<boolean | void>
    /** 请求函数 */
    api: (...args: any) => any | Promise<any>
    /** 触发请求函数的节点（组件） */
    children: ChildrenType
    /** 在请求失败时做些什么（该请求失败指的是type为error时的失败，也就是响应状态码不为10000的情况） */
    failed?: {
        /** 在请求失败时调用该函数，该函数的第一个参数为失败时的原因（请求失败时，after配置项无效） */
        end?: <T = any>(data: T) => void
        /** 请求失败后要显示的内容，该failed.children会覆盖父级的children */
        children?: ChildrenType
    }
    /**
     * 在请求成功时调用该函数（该请求成功指的是请求状态码为10000的情况）
     *
     * 该函数的第一个参数为成功时收到的响应数据
     *
     * 仅在请求成功时，after配置项才会生效（after配置项的生效时间位于succeed配置项后面）
     */
    succeed?: <T = any>(data: T) => void
    /** 在接受到响应（请求结束时）之后做点什么（无论响应成功或失败） */
    after?: {
        /** 该函数的第一个参数为请求结束时返回的响应 */
        end?: <T = any>(data: T) => void
        /** 请求结束后要显示的内容，该after.children会覆盖父级的children */
        children?: ChildrenType
    }
    /** 重新（再次）发送 */
    resend?: {
        /** 是否允许当前请求被发起多次（默认true，也就是允许） */
        is: boolean
        /**
         * 在不允许重新发送当前请求的情况下，用户仍然发送了该请求，则会调用该函数(否则不会调用)
         *
         * （该函数虽然会被调用，但请求却不会重新发出）
         */
        feedback?: () => void
    }
    /** 在请求已发出，但还未收到响应时进行的一些操作 */
    loading?: {
        /**
         *  在请求发送时展现的内容，该loading.children会覆盖父级的children
         *
         * 该配置项会覆盖isOnlyIcon
         */
        children?: ChildrenType
        /** 在此过程中是否只显示加载图标，而不显示文字内容 */
        isOnlyIcon?: boolean
        /** 在此过程中是否隐藏加载图标，默认为true（该配置项不受loading.children的影响） */
        isHiddenIcon?: boolean
        /**
         * loop属性决定是否在上一次请求还未完成时就发起下一次请求（默认false，即不允许）
         *
         * 注意，若loop不受resend.is的影响
         */
        loop?: boolean
        /** 如果此时尝试再次发送该请求，则会调用该函数 */
        feedback?: () => void
    }
}

export type TourAxiosType = FC<TourAxios>
