'use strict'

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const webpack = require('webpack')
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
    assetsPublicPath: './',
    // 是否生成用于生产构建的源映射
    productionSourceMap: true,
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
    port: 8080,
    autoOpenBrowser: true,
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
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
}
