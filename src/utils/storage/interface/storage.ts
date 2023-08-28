import type { Get } from './get'
import type { Set } from './set'
import type { Remove } from './remove'

export type Storage = {
    set: Set
    get: Get
    remove: Remove
}
