import type { CustomObject } from '@interface/type'

/** 接口状态详情 */
type StateDetails = {
    name: string
    time: number
}
/** 接口状态类型 */
type apiStateType = 'developing' | 'will_abandoned' | 'under_maintenance' | 'abnormal'

/** 平台接口状态详情 */
export type ApiStateDetails = CustomObject<apiStateType, StateDetails[]>
