'use strict'

// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
// import { argv } from 'yargs'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const env = process.env.NODE_ENV || 'dev'
const constMaps = {
  __DEV__: ['dev', 'development'],
  __PROD__: ['prod', 'production'],
  __TEST__: ['test', 'testing'],
}
const injectConst = {}
for (const key in constMaps) {
  injectConst[key] = constMaps[key].indexOf(env) > -1
}

// 这里还有些好点的东西，使用下
// https://github.com/kenberkeley/vue2-scaffold
// https://github.com/sayll/vue-start/tree/master
const envConst = {
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  },
  'NODE_ENV': env,
  '__DEBUG__': injectConst['__DEV__'], //&& !argv.no_debug,
  ...injectConst,
}


function pathConfig(src = 'src', dist = 'dist', test = 'test'){
  return {
    src: `${src}`,   // 资源根目录
    dist: `${dist}`, // 打包文件
    distdll: `${dist}/vendors`,  // dll打包文件
    static: 'static',          // 静态文件目录
    views: `${src}/views`,   // 视图目录
    assets: `${src}/assets`, // 资源目录
    components: `${src}/components`, // 组件目录
    test: `${test}`,   // 测试文件
  }
}

const paths = pathConfig('src', 'dist')

/**
 * 一些配置
 * 环境变量 env: dev,prod,testing
 * 运行模式 mode: client,server
 * 运行时类型 target: web,node,weex,hybrid
 */
let cookie
module.exports = {
  path: paths,
  template: `${paths.src}/index.tpl`,
  // 不应该使用 static 下的内容，不做 md5处理，以后就面临 cdn 缓存的问题
  favicon: resolve(`/static/img/logo.png`),
  logo: resolve(`/static/img/logo.png`),
  env: envConst,
  vendors: [ // 添加依赖
    'vue/dist/vue.esm.js'
  ],
  build: {
    env: require('./prod.env'),
    // 入口
    // index: path.resolve(__dirname, '../dist/index.html'),
    index: path.resolve(process.cwd(), paths.dist, '/index.html'),
    // 服务根目录
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsRoot: path.resolve(process.cwd(), paths.dist),
    // 指向静态资源
    assetsSubDirectory: './static',

    // you can set by youself according to actual condition
    assetsPublicPath: './',
    // Source Maps 是否生成用于生产构建的源映射
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // Gzip 默认关闭如需开启请安装下列依赖
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report` 查看捆绑分析器报表
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    // 增加错误提示
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // https://vuejs-templates.github.io/webpack/proxy.html
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {
      // 如果把 cookie 设置为HttpOnly，则可能无法通过代理传递 cookie
      // proxy all requests starting with /api to jsonplaceholder
      '/proxy': {
        target: 'https://m.api.haoshiqi.net',
        changeOrigin: true,
        // true/false, if you want to verify the SSL Certs
        // secure: false,
        pathRewrite: {
          '^/proxy': '',
        },
        logLevel: 'debug',
        proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
          // you can update headers
          // proxyReqOpts.headers['Content-Type'] = 'text/html';
          // you can change the method
          // proxyReqOpts.method = 'GET';
          // proxyReqOpts.headers['Access-Control-Allow-Origin'] = 'true';
          return proxyReqOpts;
        },
        // onProxyReq: function relayRequestHeaders(proxyReq, req) {
        //   // console.log(proxyReq.headers)
        //   if (cookie) {
        //     proxyReq.setHeader('cookie', cookie)
        //   }
        //   // proxyReq.setHeader('Access-Control-Allow-Credentials', 'true')
        // },
        // onProxyRes: function relayResponseHeaders(proxyRes, req, res) {
        //   // console.log(proxyRes.headers)
        //   var proxyCookie = proxyRes.headers['set-cookie']
        //   if (proxyCookie) {
        //     cookie = proxyCookie
        //   }
        // },
      },
    },
    // https://webpack.js.org/configuration/devtool/#development
    // cheap-module-eval-source-map is faster for development
    devtool: '#eval-source-map', // '#cheap-module-eval-source-map'

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
}
