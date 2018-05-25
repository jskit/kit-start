'use strict'

const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-build-notifier')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const {
  resolve,
  assetsPath,
  cHappypack,
} = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// https://github.com/zouhir/jarvis
// const Jarvis = require("webpack-jarvis");

// /* the rest of your webpack configs */
// plugins: [
//   new Jarvis({
//     port: 1337 // optional: set a port
//   })
// ];

// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }

const isProduction = config.env['__PROD__']

module.exports = {
  // target: 'web'
  // mode: 'production', // 'development'
  // context: path.resolve(__dirname, "../"),
  entry: {
    // libs: [
    //   'es6-promise/auto',
    //   'whatwg-fetch',
    //   'vue',
    //   'vue-router',
    //   'vuex',
    // ],
    // vendor: [
    //   // vendor 中均是非 npm 模块，用 resolve.alias 修改路径，避免冗长的相对路径。
    //   'vue-lazyload',

    //   // 'assets/libs/fastclick',
    //   // 'components/request',
    //   // 'components/ui',
    //   // 'components/bootstrap' // 初始化脚本
    // ],
    // vendor: ['vue', 'vue-router'],
    // 如需多页面，需要处理 entry
    app: resolve(config.path.src, '/main.js'), // './src/main.js',
  },
  output: {
    crossOriginLoading: 'anonymous', // false anonymous use-credentials
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProduction
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(config.path.src),
      // '@lib': resolve(config.path.assets, 'js/lib.js'),
      'assets': resolve(config.path.assets),
    }
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   debug: true
    // }),

    //进度条插件
    new ProgressBarPlugin({
      summary: false,
      format: chalk.green.bold('[:bar] :percent ') + chalk.yellow('(:elapsed seconds) :msg'),
      customSummary (buildTime) {
        process.stdout.write(chalk.green.bold(" ---------buildTime:" + buildTime + "---------"));
      },
    }),

    // https://github.com/RoccoC/webpack-build-notifier
    new WebpackNotifierPlugin({
      title: 'app',
      logo: config.logo, // || resolve(config.path.assets, 'img/logo.png'),
      successSound: 'Submarine',
      failureSound: 'Glass',
      suppressSuccess: true
    }),
    // 注入全局变量，用于条件判断
    new webpack.DefinePlugin({
      ...config.env,
    }),
    cHappypack('ESLint', [{
      loader: 'eslint-loader',
      query: {
        formatter: require('eslint-friendly-formatter'),
        // 不符合Eslint规则时只警告(默认运行出错)
        emitWarning: !config.dev.showEslintErrorsInOverlay,
      }
    }]),
    cHappypack('Js', ['babel-loader']),
    // babili-webpack-plugin
    // 全局加载引用，不必每次 import
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        // loader: 'eslint-loader',
        use: ['happypack/loader?id=ESLint'],
        enforce: 'pre',
        exclude: /(libs|node_modules|vendor)/,
        include: [
          resolve(config.path.src),
          resolve(config.path.test),
        ],
        // options: {
        //   formatter: require('eslint-friendly-formatter')
        // }
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        use: ['happypack/loader?id=Js'],
        exclude: /(libs|node_modules|vendor)/,
        include: [
          resolve(config.path.src),
          resolve(config.path.test),
        ],
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          query: vueLoaderConfig,
        },
        include: [
          resolve(config.path.src),
        ],
      },
      {
        test: /\.md/,
        loader: 'vue-markdown-loader',
        options: {
          preventExtract: true,
          use: [
            [require('markdown-it-container'), 'demo']
          ], preprocess(MarkdownIt, source) {
            const styleRegexp = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/i;
            const scriptRegexp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i;
            MarkdownIt.renderer.rules.table_open = () =>
              '<table class="kit-doc-table">';
            return source.replace(styleRegexp, '').replace(scriptRegexp, '');
          }
        }
      },
      // images from img/flags goes to flags-sprite.svg
      // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      {
        test: /\.svg$/i,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/svg')],
        // include: svgDirs,
        // include: [
        //   resolve('src/assets/svg'),
        //   resolve('src/assets/svg'),
        // ],
        options: {
          symbolId: 'icon-[name]',
          // runtimeCompat: true,
          // 不要提取成一个外部独立文件使用，这样与按需加载理念冲突
          // extract: true,
          // spriteFilename: 'svg-sprite.[hash:6].svg'
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: [resolve('src/assets/svg')],
        // include: [
        //   resolve(config.path.assets),
        // ],
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: assetsPath('img/[name].[hash:7].[ext]')
            },
          },
          // {
          //   loader: 'image-webpack-loader',
          //   query: {
          //     progressive: true,
          //     pngquant: {
          //       quality: '65-90',
          //       speed: 4
          //     }
          //   },
          // },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            // publicPath: `../../`, // 修复引用文字字体路劲错误
            name: assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      },
    ]
  },
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty'
  // },
}

// 不是测试环境，则添加Dll依赖
// if (process.env.BABEL_ENV !== 'test') {
//   module.exports.plugins.push(
//     new webpack.DllReferencePlugin({
//       context: '/',
//       manifest: require(resolve(config.path.distdll, `vendors.json`))
//     }),
//     new HtmlWebpackIncludeAssetsPlugin({
//       assets: [`${config.path.distdll.replace(`${config.path.dist}/`, '')}/vendors.js`],
//       append: false,
//       hash: true
//     })
//   )
// }
