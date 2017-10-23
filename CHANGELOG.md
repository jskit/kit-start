# 更新日志

一些常用标识：

- 🐞 fix 修复
- 🔄 update 更新
- 🔑 add 新增
- ❓ question 疑问
- ⚠️ warning 注意/提示
- 🔥 del 移除

## 1.3.0 2017-10-21

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
