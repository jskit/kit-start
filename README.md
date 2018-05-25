# kit-start

> A Vue.js project start
> - 适用于单页与多页应用.

基于 `kit-pwa` 定制项目最佳实践

## Build Setup

``` bash
# install dependencies
npm install

# 推荐使用 yarn 安装
yarn

# open server
$ npm start

# Compile and launch
$ npm run deploy
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Script Explain

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|第一次运行启用。生成DLL文件，服务启动在3000端口。|
|`dev`|与`npm start`类似相同,只有当DLL文件存在时可用,加快开发速度。|
|`build`|同`dev`在DLL文件存在时，加快打包速度。|
|`deploy`|发布：清空目录>生成生产环境的Dll>eslint检测>单元测试>打包|
|`dll:dev`|生成开发环境的DLL文件。|
|`dll:build`|生成生产环境的DLL文件。|
|`test`|开启Karma测试并生成覆盖率报告。|
|`report`|打包资源分析|
|`clean`|清除打包的文件|
|`cnpm`|安装淘宝镜像|

## 结构设计 Structure

```shell
├── dist           # 打包输出
├── config         # 打包编译配置
│   ├── env.js         # 打包环境变量
│   ├── project.js     # 项目相关
│   └── index.js       # 出口
│
├── src
│   ├── assets      # 需要编译的静态资源
│   │   └── ...
│   ├── components  # 项目内公共组件
│   ├── config      # 项目自定义配置等
│   ├── router      # 去中心化路由
│   ├── service     # api 相关模块
│   │   └── mock        # 模拟数据
│   ├── setting     # 项目参数设置
│   ├── store       # vuex
│   ├── utils       # 工具
│   ├── views       # 各页面
│   │   ├── module/  # 业务模块
│   │   │   ├── xxx.spec.js
│   │   │   ├── route.js
│   │   │   ├── store.js
│   │   │   ├── api.js
│   │   │   └── ...
│   │   └── ...
│   ├── App.vue
│   ├── main.js
│   └── index.tpl
│
├── test            # 只放配置文件，具体单元测试等文件，放在项目中（src 中）
├── static          # 无需编译的静态资源
│   ├── img/icons
│   └── manifest.json
│
├── .xxxrc          # 各种开发配置
├── package.json
└── README.md
```
