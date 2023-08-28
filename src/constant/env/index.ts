/* eslint-disable */
import { dev } from './dev'
import { prod } from './prod'
/* eslint-enable */

/**
 * 1. 生产环境下不通过cdn引入vconsole(index.html文件)
 * <script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
 *
 * 2. 更改暴露文件
 */
export const env = dev
