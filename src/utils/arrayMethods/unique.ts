import type { CustomValueByStringObject } from '@interface/type'

/** 根据数组中某一项(对象object)的特征进行去重 */
export const uniqueItem = <T extends CustomValueByStringObject<any>[]>(arr: T, prop: keyof T[0]) => {
    const data = [] as unknown as T
    arr.forEach((item) => (data.some((m) => m[prop as string] === item[prop as string]) ? null : data.push(item)))
    return data
}
