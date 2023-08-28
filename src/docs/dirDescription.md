# 1. 根目录下文件夹说明

```
- .vscode
- build # 项目打包后目录
- config # webpack
- extraPage # 额外的主站页面(如link.im.funcjin.cn等)
- node_modules
- public
- scripts # webpack
- src
- .eslintignore
- .eslintrc.json
- .gitignore
- .prettierrc
- craco.config.js
- LICENSE
- package-lock.json
- package.json
- README.md
- tsconfig.json
```

# 2. extraPage 下目录说明

```
- link # imlink.funcjin.cn网站的HTML页面
- placeholder.txt
```

# 3. src 下目录说明

```
- api # Http Api、Socket Api相关
- components # 通用组件，或可复用组件
- constant # 常量文件，包含一些配置或环境变量等
- docs # 当前项目的readme文档
- errors # 自定义错误类型
- hooks # 自定义hook
- interface # TS类型，或工具类型
- pages # 路由组件
- router # 路由配置
- style # 样式文件
- utils # 工具函数
- App.tsx # 根组件
- index.tsx # 入口文件
```

# 4. src/pages 下路由组件说明

```
- Account # 账号相关
- Commons # 通用
- Friends # 好友相关
- FriendsCircle # 朋友圈相关
- FriendsCircleSingle # 朋友圈(xx主页)
- Groupchat # 群聊相关
- Index # 首页
- Inform # 通知类相关
- Panel # 主页面板
- Room # 聊天消息
- User # 用户相关
```
