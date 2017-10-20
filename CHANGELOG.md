# 更新日志

一些常用标识：

- 🐞 fix 修复
- 🔄 update 更新
- 🔑 add 新增
- ❓ question 疑问
- ⚠️ warning 注意/提示
- 🔥 del 移除

## 1.1.0 2017-10-21

- 🔑 新增去中心化路由实现
- 🔄 调整项目结构，模板 index.tpl 路径
- 🐞 修复调整结构后，导致的 test 任务错误
- 🐞 修复非根目录发布项目的静态文件输出路径配置, 修改如下
  - assetsSubDirectory: 'static' => './static',
  - assetsPublicPath: '/' => './',
- 🔄 调整CopyWebpackPlugin配置，处理非 webpack 模块引入图片不会打包资源的问题

## < 1.x

< 1.x 的版本，去 GitHub 查看 0.x 到 1.x 的 Change Log 吧。
