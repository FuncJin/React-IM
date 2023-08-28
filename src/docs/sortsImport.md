## 项目遵循的 import 引入规范

1. 第三方 JavaScript 库
2. 第三方 UI 组件库
3. 路由组件(注册了 History Router 的组件)
4. 通用组件(封装的公共组件，必须是公共可复用的组件)
5. 自定义组件(除路由组件、通用组件外的自定义组件，例如某个组件的子组件)
6. 自定义 hooks
7. 工具类函数导入、或其它辅助性函数、配置项等
8. 网络请求接口导入(Http api)
9. 网络请求接口导入(Socket api)
10. 第三方 TypeScript 声明
11. 自己的 TypeScript 声明
12. 图片、音频等媒体文件
13. less 等样式文件

> 1. 每个分类以换行符进行分隔
> 2. 相对路径在当前分类的下方，且没有换行

## 举例如下

```typescript
import { useState } from 'react'

import { Button } from 'antd'

import Login from '@pages/Account/Login'

import CountDown from '@components/CountDown'

import Children from './Children'

import { useXxx } from '@hooks'

import { timeUtils } from '@utils/time'
import { constant } from '@constant'

import { loginHttpApi } from '@api/http/url/account/login'

import type { FC } from 'react'

import type { HttpApi } from '@api/http/interface/api'
import type { PrivateMsg } from './interface'

import avatar from './avatar.jpg'

import './less'
```
