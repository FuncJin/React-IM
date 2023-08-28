/** 获取0-x之间的随机数(包含x) */
export const getZeroCeilRandom = (x: number) => Math.round(Math.random() * x)

/** 获取x-y之间的随机数(包含x与y) */
export const getSectionRandom = (x: number, y: number) => Math.round(Math.random() * (y - x) + x)
