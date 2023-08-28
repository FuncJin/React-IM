/**
 * 全局发布订阅的事件名
 * - friendsCircleRedDotByTab: 首页Tab栏朋友圈红点
 */
export type EventsName = 'friendsCircleRedDotByTab'

export type SubscribeCallback<T = any> = (name: EventsName, data: T) => void
