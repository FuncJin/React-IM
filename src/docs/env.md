# env

项目采用配置的形式来决定当前是生产环境还是开发环境，你可以在`src/constant/env`文件夹下自由地更改你所需要的配置

## 文字叙述

按照项目的当前开发规范来讲，`src/constant/env`文件夹应包含以下三个文件

-   `index.ts`
-   `dev.ts`
-   `prod.ts`

且`index.ts`文件需要同时引入`dev.ts`与`prod.ts`，并暴露其中之一。

> 假设 index.ts 文件暴露的是 prod.ts，则代表当前环境是生产环境。反之，如果暴露的是 dev.ts，则代表当前环境是开发环境

## 步骤示例

如果上面的文字内容你还不太理解，那么你可以参考以下步骤

1. 你看到的`src/constant/env`文件夹结构如下

由于该文件夹下的`dev.ts`与`prod.ts`文件已被忽略提交，所以你看到的实际目录结构如下

```
env
    · _dev.ts
    · _prod.ts
    · index.ts
```

2. 修改文件名

因为`dev.ts`与`prod.ts`文件已被忽略提交，所以你需要将`_dev.ts`与`_prod.ts`文件的名称更改为`dev.ts`与`prod.ts`，新的目录结构为

```
env
    · index.ts
    · dev.ts # 新增
    · prod.ts # 新增
```

4. 打开`index.ts`文件，然后暴露不同的环境即可

```typescript
import { dev } from './dev'
import { prod } from './prod'

// 此时为开发环境
export const env = dev
```
