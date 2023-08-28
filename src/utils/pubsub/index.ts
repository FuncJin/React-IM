import type { EventsName, SubscribeCallback } from './interface'

class PubSub {
    /** map: [[eventName, fn]] */
    private readonly container = new Map<EventsName, Function[]>([])
    /** 发布 */
    publish(name: 'friendsCircleRedDotByTab', data: boolean): void
    publish(name: EventsName, data: any) {
        /**
         * 发布事件有两种情况：
         *  1. 当前事件已被订阅，则触发其事件
         *  2. 当前事件未被订阅，则抛出错误
         */
        const fn = this.container.get(name)
        if (!fn) throw new ReferenceError(`未订阅${name}事件`)
        /** 每个订阅的函数都会收到其事件名，及发布的数据 */
        fn.forEach((f) => f(name, data))
    }
    /** 订阅 */
    subscribe(name: 'friendsCircleRedDotByTab', fn: SubscribeCallback<boolean>): void
    subscribe(name: EventsName, fn: SubscribeCallback<any>) {
        const _fns = this.container.get(name)
        // 允许多处订阅
        const fns = _fns ? _fns : []
        fns?.push(fn)
        this.container.set(name, fns)
    }
    /** 取消订阅 */
    unsubscribe(name: EventsName) {
        /**
         * 取消订阅有两种情况：
         *  1. 当前事件已被订阅过，则在container中删除该事件
         *  2. 当前事件未被订阅，则抛出错误
         */
        const have = this.container.get(name)
        if (!have) throw new ReferenceError(`未订阅${name}事件`)
        this.container.delete(name)
    }
}

/** 发布订阅 */
export const pubsub = new PubSub()
