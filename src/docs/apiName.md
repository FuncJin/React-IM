# apiName

项目采用 axios 来接管所有已被使用的 Http 接口，但为了避免被攻击者利用接口进行恶意攻击或者数据泄露，所以出于安全性考虑，项目中的所有接口名称已被忽略提交至 git

隐藏接口名称的同时，为了确保提供足够的文档和技术支持，以及方便开发者能够理解和使用此项目，你在运行此项目时请按以下步骤操作

## 文字叙述

以`/src/api/http/url/account`文件夹为例。此文件夹下必须要确保`apiName.ts`文件的存在，该文件的作用是存储当前文件夹下用到的所有接口名称（上方已提到过出于安全性的考虑，此文件已被忽略提交），所以需要你手动添加该文件！

但考虑到此项目使用的接口太多，所以在每个对应的文件夹下都提供了`_apiName.ts`文件，你只需要将`_apiName.ts`文件的名称改为`apiName.ts`即可

若你在运行此项目时需要使用网络请求部分，则你需要将新的`apiName.ts`文件中的接口名称更改为你自己的接口（此接口可以是你自己开发的接口，也可以是你所 Mock 的接口）

## 步骤示例

如果上面的文字内容你还不太理解，那么你可以参考以下步骤（仍以`/src/api/http/url/account`文件夹为例）

1. 你看到的`account`文件夹的结构如下

```
* account
    * login
    * logout
    * register
    * token
    * type
    * _apiName.ts
```

2. 打开`_apiName.ts`会看到以下内容

```typescript
export const apiName = ['apiName'] as any
```

3. 假设你自己开发或 Mock 了两个 Http 接口，接口名称分别为`/a`与`/b`。此时你应该将`_apiName.ts`文件中的原接口名称更改为新接口名称，示例如下

原文件内容：

```typescript
export const apiName = ['apiName'] as any
```

需要更改为以下内容：

```typescript
export const apiName = ['/a', '/b'] as const
```

4. 随后只需将`_apiName.ts`文件的名称更改为`apiName.ts`

> 项目中所有的\_apiName.ts 都需要更改为 apiName.ts

## 小 Tip

如果你没有用到网络请求，那么步骤示例中的**第二步**与**第三步**可以**完全省略**，也就是只需**更改文件名称**即可
