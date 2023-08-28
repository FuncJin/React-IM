import { decode } from './decode'
import { encode } from './encode'

import type { Storage } from './interface/storage'

/** window.localStorage */
export const storage: Storage = {
    set: (key, value, params?) => encode[key](key, value, params as string),
    get: (key, params?) => decode[key](key, params as string),
    remove: (key) => window.localStorage.removeItem(key)
}
