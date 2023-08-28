export type CascaderType = {
    /** 省 */
    prov: string
    /** 市 */
    city: string
    /** 更改地区后触发 */
    onChange: (prov: string, city: string) => void
}
