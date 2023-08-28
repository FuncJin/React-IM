/** 5分钟之内，不显示日期 */
const last = { timestamp: 0 }

const isTime = (preTimestamp: number, i: number) => {
    // 避免每次更新时使用的值都是上一次的
    if (i === 0) {
        last.timestamp = 0
    }
    const timeLimit = 1000 * 60 * 5
    const isOut = preTimestamp - last.timestamp <= timeLimit
    if (isOut) return true
    last.timestamp = preTimestamp
    return false
}

export const chat = { isTime }
