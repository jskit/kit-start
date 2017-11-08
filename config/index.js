// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var webpack = require('webpack')
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
const envConst = {
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  },
  'NODE_ENV': env,
  '__DEBUG__': injectConst['__DEV__'], //&& !argv.no_debug,
  ...injectConst,
}

/**
 * 一些配置
 * 环境变量 env: dev,prod,testing
 * 运行模式 mode: client,server
 * 运行时类型 target: web,node,weex,hybrid
 */
var cookie
module.exports = {
  template: 'src/index.tpl',
  logo: resolve('/static/img/logo.png'),
  env: envConst,
  plugins: [
    // 注入全局变量，用于条件判断
    new webpack.DefinePlugin({
      ...envConst,
    }),
    // babili-webpack-plugin
    // 全局加载引用，不必每次 import
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ],
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
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
        onProxyReq: function relayRequestHeaders(proxyReq, req) {
          // console.log(proxyReq.headers)
          if (cookie) {
            proxyReq.setHeader('cookie', cookie)
          }
          // proxyReq.setHeader('Access-Control-Allow-Credentials', 'true')
        },
        onProxyRes: function relayResponseHeaders(proxyRes, req, res) {
          // console.log(proxyRes.headers)
          var proxyCookie = proxyRes.headers['set-cookie']
          if (proxyCookie) {
            cookie = proxyCookie
          }
        },
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
