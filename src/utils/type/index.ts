type Tuple = <T extends (number | string | boolean)[]>(...args: T) => T

export const tuple: Tuple = (...args) => args
