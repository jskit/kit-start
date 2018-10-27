# admin-x

## Project setup

```bash
npm i -g @vue/cli
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Lints and fixes files

```bash
yarn run lint
```

### Run your unit tests

```bash
yarn run test:unit
```

### Run your end-to-end tests

```bash
yarn run test:e2e
```

### Deploy

```bash
yarn deploy

deploy branch gh-pages
```

## 规划发展

- 接口命名，良好一致的命名规范
  - 参考 https://segmentfault.com/user/login
  - user/login|register|forgot|phoneLogin
  - sys/menu|account|dict|job|monitor|notice|role|sql
  - org/dept|res|personnel|post
  - oss/oss
  - project/proj|task|tender|tracking
  - example/xxx
- 开发示例
  - 各种组件开发示例等
- 并行开发流程
  - MockServer 配置
- 登录方式
  - 手机登录 - 短信
  - 邮箱登录
  - QQ登录
  - 微博登录
  - 微信个人账户
  - 微信公众账号
  - 微信小程序
  - 匿名登录
  - 集成已有认证方式
- 用户列表
  - 用户昵称 手机号码 邮箱 登录方式 创建日期 上次登录 UID

## 项目配置调整以及增强

- [x] vue-cli 3.0 搭建最新vue版本
- [x] 环境变量 √ 支持自定义环境变量
- [x] 七牛配置 √ 支持上传cdn 以及替换路径
- [x] svg加载处理 √ svg-sprite-loader app.js一次性加载全部 ICON
- [ ] manifest 提取(不一定再需要)
- [ ] pwa
- [ ] 预加载
- [x] report 分析 √ 暂时使用 vue ui 提供的
- [ ] skeleton 骨架屏
- [x] 代码规范 prettier 规则(没有太多的配置项可供选择)
- [ ] stylelint 规则
- [x] 缓存处理 storage, session `@/utils/storage`
- [ ] 转场动画约定
  - 同级页面不要动画
  - 第一次进入不要动画效果
  - 刷新不要动画效果
  - 记录滚动位置
  - 怎么进就怎么出
- [ ] 分享先到首页再到目标页面
- [x] 约定规则-关于层级
  - popup         >1000
  - mask          >1000
  - navigation    500~600
  - content       10~100
  - body,#app     1-9(用于转场、人为干扰复合层的排序)
- [x] Debug 调试页面 `/#/debug`
- [x] bridge `@/utils/bridge`
- [ ] 统计数据 `@/utils/tongji`
- [x] 样式引入
  - `import '~@/'`

## 功能封装

- [ ] error 错误页面
- [ ] api请求的封装
- [ ] 列表demo 组件
- [ ] 路由-权限
- 公共组件：
  - [ ] swiper 组件
  - [ ] tabs 切换组件
  - [ ] 上传图片组件
  - [ ] 预览组件
  - [ ] 搜索组件
  - [ ] 瀑布流布局组件
  - [ ] header 组件
  - [ ] tabbar 组件

## forward

- 如果是非http链接，即为站内链接 如 profile
  - 如果是app内并且是tab页面，新开页面
  - 否则站内跳转 router.push
- 如果是站外链接
  - 如果是http链接
    - 如果是本站域名，则走站内链接逻辑
    - 如果非本站域名，直接location.href=url
  - 如果是schema链接，暂不支持（进入链接不允许schema，跳出链接可以为schema）
- 补充：如果强制要求使用对应端的url链接，配置query参数 target-type=native/h5/miniapp 等

## 部分依赖处理

- `eslint-plugin-import` 用于本地IDE代码检查
- `lint-staged` 用于 gitHooks `pre-commit`
  `eslint --fix` 改为 `vue-cli-service lint`;
- `babel-plugin-webpack-async-module-name`
- [自动化导入](https://cli.vuejs.org/zh/guide/css.html#自动化导入)
  - `vue-cli-plugin-style-resources-loader`

## 自动化测试

### 为什么需要自动化测试?

一个项目最终会经过快速迭代走向以维护为主的状态，在合理的时机以合理的方式引入自动化测试能有效减少人工维护成本。自动化测试的收益可以简单总结为：

> 自动化的收益 = 迭代次数 * 全手动执行成本 - 首次自动化成本 - 维护次数 * 维护成本

对于自动化测试来说，相对于发现未知的问题，更倾向于避免可能的问题。

- 单元测试 Unit Testing
  - 关注应用中每个零部件的正常运转，防止后续修改影响之前的组件。
  - jest 内置测试覆盖率工具 [istanbul](https://github.com/gotwarlost/istanbul) 开启使用参数 `jest --coverage`
  - 只关注代码覆盖率很可笑。关注在10%的风险最高的代码比关注99%可忽略风险的代码，收益要多得多。我认为风险覆盖比起测试覆盖要重要得多。
- 端到端测试又叫功能测试 E2E testing

## 环境变量

除了环境变量 `VUE_APP_*` 之外，在你的应用代码中始终可用的还有两个特殊的变量：

- 模式变量 `NODE_ENV` - 会是 `"development"`、`"production"` 或 `"test"` 中的一个。具体的值取决于应用运行的模式。
- 基础路径 `BASE_URL` - 会和 `vue.config.js` 中的 `baseUrl` 选项相符，即你的应用会部署到的基础路径。

```bash
# production
vue-cli-service build

# 可以自己添加 .env.staging，启动如下
vue-cli-service build --mode staging
```

## 其他

```js
// 自定义解析URL
// import { urlMap, getUrlType, getParams } from '@/utils/urlMap';

// 这里要处理url 与 query 的参数合并（需要提取path、合并query）
// 本质真正要处理的，只是一种：站内链接，其余都是站外链接（其他H5或schema链接）
// 所以封装两个 站内链接 + 站外链接 两个方法即可；
// 最终定位封装一个urlParse方法，解析为一个对象以及各种url参数数据，同时包含是否站内链接等，可以传入target目标链接
// URL解析url，自定义schema与http链接解析结果pathname不一致，例如
// mishifeng://native/home?id=xxx
// https://m.mishifeng.com/home?id=xxx

export function urlfix(url, paramsUrl = '') {
  let fixUrl = url;
  if (paramsUrl) {
    fixUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + paramsUrl;
  }
  return fixUrl;
}

export function urlParse(url) {
  try {
    return new URL(url);
  } catch (err) {
    console.error('URL is not a constructor');
  }
  return {};
}

// const httpReg = /^https?/i;
// regex-weburl.js
// https://gist.github.com/dperini/729294
// http://nodejs.cn/api/url.html

// function getChannel(url = '', targetUrl = url) {
//   // 透传参数
//   // 如果targetUrl已存在参数，则不透传
//   const query = getParams(url) || {};
//   const targetQuery = getParams(targetUrl, '') || {};
//   const paramsObj = {};
//   const params = ['d_host', 'channel_id', 'spm', 'share'];
//   for (let i = 0; i < params.length; i++) {
//     const key = params[i];
//     if (query[key] && query[key] !== targetQuery[key]) {
//       paramsObj[key] = query[key];
//     }
//   }
//   return paramsObj;
// }

```


- git无法pull仓库refusing to merge unrelated histories

如果合并了两个不同的开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示

```bash
fatal: refusing to merge unrelated histories
```

  https://blog.csdn.net/lindexi_gd/article/details/52554159


解决方法

```bash
git pull --allow-unrelated-histories
```

- RemoveParentModulesPlugin takes a long time with hundreds of chunks

https://github.com/webpack/webpack/issues/6248
