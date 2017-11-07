# 更新日志

一些常用标识：

- 🐞 fix 修复
- 🔄 update 更新
- 🔑 add 新增
- ❓ question 疑问
- ⚠️ warning 注意/提示
- 🔥 del 移除

## 1.6.x 2017-10-30

- 🔑 新增编译中间状态，目前编译中间状态时间比较长没有反馈
  - 新增 `progress-bar-webpack-plugin` 处理进度
- 🔑 新增编译失败或成功的通知提示
  - 新增 `webpack-build-notifier` 提示编译成功或失败
- 🔑 新增注入变量，实现更简洁的环境判断
  - `__DEV__`  开发环境
  - `__PROD__` 生成环境
  - `__TEST__` 测试环境
  - `__DEBUG__` debug 模式
- 🔑 新增 deploy 脚本命令，直接发布 dist 到 gh-pages 分支
  - `"deploy": "gh-pages -d dist",`

## 1.5.x 2017-10-27

- 🔄 升级 `package.json`
  - 🔑 新增 `postcss-position`
  - 🔑 新增 `postcss-size`
  - 🔑 新增 `babel-plugin-syntax-dynamic-import` 动态解析 import()，实现路由懒加载
  - 🔑 新增 `babel-plugin-transform-vue-jsx` 支持 vue 直接 render JSX 语法
  - 🔑 新增 `postcss-plugin-px2rem` 单位 px 转 rem
  - 🔄 升级 package.json 依赖版本

## 1.4.0 2017-10-23

- 🔑 新增去中心化路由实现
- 🔄 调整项目结构，模板 index.tpl 路径
- 🐞 修复调整结构后，导致的 test 任务错误
- 🐞 修复非根目录发布项目的静态文件输出路径配置, 修改如下
  - assetsSubDirectory: 'static' => './static',
  - assetsPublicPath: '/' => './',
- 🔄 调整CopyWebpackPlugin配置，处理非 webpack 模块引入图片不会打包资源的问题
  - ```js
    // 新增配置处理引入资源问题
    new CopyWebpackPlugin([
      ...
      {
        from: 'src/assets',
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),```
- 🔑 新增别名assets，这样就不用考虑各种相对路径了（注意配合~assets 使用）
  - 别名设置 `'assets': path.resolve(__dirname, '../src/assets')`
  - html引用 `<img src="~assets/img/logo.png" alt="">`
- 🔑 新增去中心化 store 使用模板
- 🔑 新增结构规划设计文档

```vue
// js 中不能直接写字符串路径，非 webpack 模块，不会打包处理
// js 中引入图片的正确写法
<img :src="avatar" />

import avatar from '@/assets/img/logo.png'

在data里面定义
avatar: avatar
```

## < 1.x

< 1.x 的版本，去 GitHub 查看 0.x 到 1.x 的 Change Log 吧。
