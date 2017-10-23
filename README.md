# kit-start

> A Vue.js project

基于 `kit-pwa` 定制项目最佳实践

## Build Setup

``` bash
# install dependencies
npm install
# 推荐使用 yarn 安装
yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

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
│   │   ├── module/
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
