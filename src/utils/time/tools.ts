import { constant } from '@constant'

/** 星期 */
const transfer = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

/** 格式化时间位数 */
const timeDigitFormat = (time: number) => (time < 10 ? `0${time}` : `${time}`)
const getDateObject = (date: Date | number) => (typeof date === 'number' ? new Date(date) : date)

/** 得到对应的日期(2022/06/28) */
const getDate = (_date: Date | number) => {
    const date = getDateObject(_date)
    const year = date.getFullYear()
    const month = timeDigitFormat(date.getMonth() + 1)
    const day = timeDigitFormat(date.getDate())
    return `${year}/${month}/${day}`
}
/** 得到对应的日期(2022/06/28 15:21) */
const getWholeDate = (_date: Date | number) => {
    const date = getDateObject(_date)
    const hour = timeDigitFormat(date.getHours())
    const mins = timeDigitFormat(date.getMinutes())
    return `${getDate(date)} ${hour}:${mins}`
}
/**
 *
 * 传入一个时间戳，得到该时间戳所对应的天数
 *
 * 例如传入1000*60*60*24*1，则得到1(天)
 */
const getDaysTimeSection = (timestamp: number) => {
    const day = 1000 * 60 * 60 * 24
    return Math.floor(timestamp / day)
}
/**
 * 两个时间戳是否相距五分钟
 *
 * 例如传入2023/03/05 14:15分，而现在是2023/03/05 14:21，此时返回false
 */
const isPreFiveMinsTime = (time: number) => {
    const curTimestamp = Number(new Date())
    return !(curTimestamp - Number(time) > 1000 * 60 * 5)
}

/** 获取指定日期的年月日(例如2023 01 04) */
const getTime_YMD = (date: Date) => {
    const year = String(date.getFullYear())
    const month = timeDigitFormat(date.getMonth() + 1)
    const day = timeDigitFormat(date.getDate())
    return {
        year,
        month,
        day
    }
}

/** 获取指定日期的年月日和时间(例如2023 03 20 18 04) */
const getTime_YMDHM = (date: Date) => {
    const hours = timeDigitFormat(date.getHours())
    const mins = timeDigitFormat(date.getMinutes())
    return { ...getTime_YMD(date), hours, mins }
}

/**
 * 根据时间戳得到日期的字符串表示
 *
 * 1. 当天的时间戳只显示时间(例如：2021-11-06 22:28，如果还没到11-07日(0-24)，则返回22:28)
 * 2. 如果是昨天，则返回的时间将带有“昨天”字样(例如：2021-11-06 22:28，而今天是2021-11-07，则返回"昨天 22:28")
 * 3. 超过一年则返回具体日期(例如：2020-11-06 21:18)
 * 4. 超过七天返回月份(例如：11-06 21:19)，未超过七天则只返回星期几(例如：星期六 21:19)
 */
const getTime = (preTimestamp: number) => {
    const DATE = new Date(preTimestamp)
    const currentDATE = new Date()
    const { year, month, day, hours, mins } = getTime_YMDHM(DATE)
    // 超过一年
    const currentYear = currentDATE.getFullYear()
    if (Number(year) < currentYear)
        return {
            all: `${year}-${month}-${day} ${hours}:${mins}`,
            tiny: `${year}-${month}-${day}`
        }
    // 超过7天
    const isOut = Number(currentDATE) - preTimestamp > constant.time.days._7
    if (isOut)
        return {
            all: `${month}-${day} ${hours}:${mins}`,
            tiny: `${month}-${day}`
        }
    // 是否是当天
    const currentDate_c = currentDATE.getDate()
    if (Number(day) === currentDate_c)
        return {
            all: `${hours}:${mins}`,
            tiny: `${hours}:${mins}`
        }
    // 是否是昨天
    const currentDate_p = currentDATE.getDate()
    if (Number(day) === currentDate_p - 1)
        return {
            all: `昨天 ${hours}:${mins}`,
            tiny: `昨天 ${hours}:${mins}`
        }
    // 否则按照未超过7天处理
    const currentDay = new Date(preTimestamp).getDay()
    const week = transfer[currentDay]
    return {
        all: `${week} ${hours}:${mins}`,
        tiny: week
    }
}

export const tools = { timeDigitFormat, getDate, getWholeDate, getDaysTimeSection, isPreFiveMinsTime, getTime }
