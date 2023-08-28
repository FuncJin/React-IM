import type { CustomObject, CustomValueByStringObject } from '@interface/type'

type TestFunc = (text: string) => boolean
type RegObject = CustomValueByStringObject<RegExp>

type Specific = CustomObject<keyof typeof specific, TestFunc>
type ContentLimit = CustomObject<keyof typeof contentLimit, TestFunc>

/** 最大与最小 */
const rangeReg = /^(?<min>\d+)_(?<max>\d+)$/
/** 任意内容 */
const emptyReg = /.*/

const contentLimit = {
    '5_': emptyReg,
    '8_': emptyReg,
    '1_7': emptyReg,
    '1_50': emptyReg,
    '1_100': emptyReg,
    '1_150': emptyReg,
    '1_200': emptyReg,
    '2_15': emptyReg,
    '3_7': emptyReg,
    '29_33': emptyReg,
    '30_200': emptyReg,
    /** 任意，可以为空 */
    atWill: emptyReg
}

const specific = {
    /** 账号必须是纯数字，不能有任何其它字符 */
    id: /^\d{4,6}$/,
    /** 密码中只能出现数字和字母、下划线，不能出现任何其它字符 */
    password: /^\w{8,16}$/,
    /** 邮箱 */
    mail: /^\w+@([\da-z\.-]+)\.([a-z]+|[\u2E80-\u9FFF]+)$/,
    /** 邮箱验证码 */
    mailCode: /^\d{6}$/
}

const mapRules = <T>(regs: RegObject): T => {
    const result = {} as any
    Object.keys(regs).forEach((k) => {
        result[k] = (_text: string) => {
            const text = _text.trim()
            const range = rangeReg.exec(k)
            // 如果不需要计算长度
            if (!range) return regs[k].test(text)
            const { min, max } = range.groups!
            // emoji表情的长度按照1来处理
            if (text.length < Number(min) || text.length > Number(max)) return false
            return true
        }
    })
    return result
}

/** 向服务器提交内容前，对输入的内容进行校验的规则 */
export const appRules = {
    /** 具体规则 */
    specific: mapRules<Specific>(specific),
    /** 任意规则 */
    contentLimit: mapRules<ContentLimit>(contentLimit)
}
