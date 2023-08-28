import { useState } from 'react'

/** Response State */
export const useAsyncResponseState = <T = any>(val: T) => useState(val)
