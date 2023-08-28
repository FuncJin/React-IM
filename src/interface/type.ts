/**
 * 自定义对象：
 *
 * 键为string类型，属性值为指定类型(默认any)
 */
export type CustomValueByStringObject<T = any> = { [k: string]: T }

/**
 * 自定义对象：
 *
 * 键为一组映射类型，属性值为string类型
 */
// eslint-disable-next-line
export type CustomKeyByObject<T extends string> = { [k in T]: string }

/**
 * 自定义对象：
 *
 * 键为一组映射类型，属性值为指定类型(默认any)
 */
// eslint-disable-next-line
export type CustomObject<T extends string, U = any> = { [k in T]: U }

/**
 * 当前im平台在代码开发中所使用到的id类型
 *
 * 包含uid(用户id、或自己的id)、oid(对方id)、gid(群聊id)、noid(空id)、id(包含所有)
 */
export type MapId<T extends 'uid' | 'oid' | 'gid' | 'noid' | 'id'> = CustomKeyByObject<T>
