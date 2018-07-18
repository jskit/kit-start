'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const CleanPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackPluginInject = require('html-webpack-inject-attributes-plugin')
// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const OfflinePlugin = require('offline-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const QiniuPlugin = require('qiniu-webpack-plugin')
// const QiniuCdnPlugin = require('qiniu-cdn-webpack-plugin')
// const vConsolePlugin = require('./plugins/vconsole-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const loadMinified = require('./load-minified')

const isTesting = config.env['__TEST__']
const { qnConfig } = config

const env = isTesting
  ? require('../config/test.env')
  : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // new CleanPlugin(`${config.path.dist}`),
    // 注入变量 base 中统一处理 webpack.DefinePlugin
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // new webpack.DefinePlugin({
    //   'process.env': env
    // }),
    // UglifyJsPlugin 处理 node_modules 里es6内容会报错
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // 也可以使用这个
    // new webpack.optimize.UglifyJsPlugin({
    //   output: {
    //     // false 是去掉注释
    //     comments: false,
    //   },
    //   compress: {
    //     // 忽略警告,要不然会有一大堆的黄色字体出现...
    //     warnings: false,
    //   },
    //   mangle: {
    //    // 排除不想要压缩的对象名称
    //    // except: ['$super', '$', 'exports', 'require', 'module', '_']
    //   },
    //   sourceMap: config.build.productionSourceMap,
    // }),
    // new UglifyEsPlugin(),
    // 使用 babel-minify 替代 UglifyJs 处理不支持 ES6的问题
    // new require('babel-minify')(),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: false,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // https://github.com/blade254353074/multi-vue
    // 多个 HTML 就配置多个 HtmlWebpackPlugin
    // 如果同时引入了html-loader和html-webpack-plugin，两个插件都设置了minify属性，则会编译生成时报错
    new HtmlWebpackPlugin({
      filename: isTesting
        ? 'index.html'
        : config.build.index,    // 生成的文件
      template: config.template, // 'src/index.tpl' 相对于当前这个配置文件的
      favicon: config.favicon,
      inject: true,
      title: 'jskit',
      minify: {
        minifyJS: {
          // TODO: 没效果
          compress: {
            warnings: true,
          },
          // mangle: true,
        },
        removeComments: true,         // 删除 html 中注释
        collapseWhitespace: true,     // 删除空白行与换行符
        removeAttributeQuotes: false,  // 去除属性引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
        // minifyJS https://segmentfault.com/a/1190000008995453
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 必须通过 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname, './service-worker-prod.js'))}</script>`,
    }),

    // new vConsolePlugin({
    //   filter: [],   // 需要过滤的入口文件
    //   enable: config.debug, // 发布代码前记得改回 false
    // }),

    // new SkeletonPlugin({
    //   // 生成名为 shell.html 文件存放地址
    //   pathname: path.resolve(__dirname, `../src`)
    // }),
    // 让静态资源支持 DNS 预解析和预加载
    // https://www.w3cplus.com/performance/reloading/preload-prefetch-and-priorities-in-chrome.html
    // 使用 preload-webpack-plugin 替换页面中的手写脚本
    // <% for (var chunk of webpack.chunks) {
    // for (var file of chunk.files) {
    //   if (file.match(/\.(js|css)$/) && file.indexOf('manifest') === -1) { %>
    //     <link rel="<%= chunk.initial?'preload':'prefetch' %>" href="<%= htmlWebpackPlugin.files.publicPath + file %>" as="<%= file.match(/\.css$/)?'style':'script' %>"><% }}} %>
    new PreloadWebpackPlugin({
      // rel: 'preload',
      include: 'initial',
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      // include: 'asyncChunks',
      fileBlacklist: [/\.(map)$/, /manifest/],
    }),

    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      // 将 `manifest` 优先于 libs 进行提取，
      // 则可以将 webpack runtime 分离到这个块中。
      // names: ['manifest', 'libs', 'vendor'].reverse(),
      name: 'vendor',
      // manifest 只是个有意义的名字，也可以改成其他名字。
      minChunks(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            utils.resolve('node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      // 迁移到 base dll 相关配置
      name: 'manifest',
      // chunks: ['vendor'],
      minChunks: Infinity,
    }),

    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3,
    }),

    // 目前是所有的都加了，包含css以及图片，可以只加js
    // new HtmlWebpackPluginInject({
    //   'crossOrigin': 'anonymous',
    //   // chunks: ['manifest', 'vendor', 'app'],
    // }),

    // 依赖提取 manifest 功能，manifest.js 实在是太小了，以至于不值得再为一个小 js 增加资源请求数量。
    new InlineManifestWebpackPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve(config.path.static),
        to: config.build.assetsSubDirectory,
        ignore: ['.*', 'CNAME']
      },
      // webpack中JS手动引入的图片问题(按照约定，assets内全为需要编译的图片，不需要的放在 static 下)
      // webpack是万物皆模块，但也就是说，不通过require引入的就不会算成模块了(插件中的另算，那是处理过的)。所以，在JS中手动引入图片时会遇到问题就是对应的图片并不会被打包，导致之后找不到路径。
      {
        from: utils.resolve(config.path.static + '/CNAME'),
        //  to: './',
        ignore: ['.*'],
      },
    ]),

    // service worker caching
    // webpack needs the trailing slash for output.publicPath

    // https://www.npmjs.com/package/sw-precache-webpack-plugin
    // https://github.com/GoogleChromeLabs/sw-precache
    // https://github.com/GoogleChromeLabs/sw-precache/blob/master/service-worker.tmpl
    // https://zhuanlan.zhihu.com/p/25020938
    // https://zhuanlan.zhihu.com/p/25800461
    // https://github.com/GoogleChromeLabs/sw-precache/issues/192
    // https://developers.google.com/web/fundamentals/app-install-banners/
    // offline-plugin
    new SWPrecacheWebpackPlugin({
      // https://googlechrome.github.io/sw-toolbox/api.html
      cacheId: config.name,
      filename: 'sw.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      // dontCacheBustUrlsMatching: /\.\w{20}\./,
      // stripPrefix: 'static/',
      // replacePrefix: qnConfig.domain ? `${qnConfig.domain}${qnConfig.prefix}/` : `/v2/`,
      // navigateFallback: '/v2/' + 'index.html',  // PUBLIC_PATH + 'index.html'
      // use this to ignore sourcemap files
      // staticFileGlobsIgnorePatterns: [/\.map$/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/, /manifest\.\w{20}\.js$/],
      // staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.\w{20}\.js$/],
      // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
      // mergeStaticsConfig: true,
      // stripPrefixMulti is also supported
      // stripPrefix: qnConfig.domain ? `${qnConfig.domain}${qnConfig.prefix}/` : `${config.path.dist}/`,
      // stripPrefix: `${config.path.dist}/`,
      // staticFileGlobs: [
      //   `*.{html}`,
      //   `${config.path.dist}/**/*.{js,html,css}`,
      // ],
      runtimeCaching: [
        {
          urlPattern: '/(.*)',
          handler: 'networkFirst',
        },
        {
          urlPattern: '/(.*)',
          // urlPattern: '/bookmark/tag?page=1&tag=SVG',
          handler: 'networkFirst',
          options: {
            origin: 'https://m.api.haoshiqi.net',
          },
        },
      ],
    }),

    // 该离线化插件最好放在最后一个 保证前面对资源文件的各种构建完毕
    // new OfflinePlugin({
    //   publicPath: '',
    //   relativePaths: true,
    //   AppCache: false,
    //   ServiceWorker: {
    //     events: true,
    //   },
    //   externals: [
    //     'https://res.wx.qq.com/open/js/jweixin-1.2.0.js',
    //   ],
    //   rewrites: function (asset) {
    //     // rewrite builded CDN files，exclude external CDN files
    //     if (asset.indexOf('//awp-assets') !== 0 && asset.indexOf('.js') > -1 || asset.indexOf('.css') > -1) {
    //       console.log(asset);
    //       return config.build.assetsPublicPath + asset;
    //     } else if (asset.indexOf('.html') > -1) {
    //       return './' + asset;
    //     }
    //     return asset;
    //   }
    // }),
  ]
})

if (qnConfig.domain) {
  webpackConfig.plugins.push(
    // 七牛
    new QiniuPlugin({
      prefix: qnConfig.prefix,
      ACCESS_KEY: qnConfig.ak,
      SECRET_KEY: qnConfig.sk,
      bucket: qnConfig.bucket,
      path: qnConfig.path,
    }),
    // new QiniuCdnPlugin({
    //   accessKey: qnConfig.ak,
    //   secretKey: qnConfig.sk,
    //   bucket: qnConfig.bucket,
    //   zone: 'Zone_z0', // 七牛云存储位置，华东 Zone_z0, 华北 Zone_z1, 华南 Zone_z2, 北美 Zone_na0
    //   exclude: /\.html/,
    //   refreshCDN: qnConfig.domain,
    //   // refreshFilter: /(a\.js)|(b\.js)/,
    //   clean: false,
    //   // cleanExclude: /c\.js/
    // }),
  )
}

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

// 生成视图
// const pages = utils.getEntries(utils.resolve(config.path.views,'**/*.html'))

// for (let page in pages) {
//   const conf = {
//     filename: page + '.html',
//     template: pages[page],
//     inject: true,
//     excludeChunks: Object.keys(pages).filter(item => {
//       return (item !== page)
//     }),
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeRedundantAttributes: true,
//       useShortDoctype: true,
//       removeEmptyAttributes: true,
//       removeStyleLinkTypeAttributes: true,
//       keepClosingSlash: true,
//       minifyJS: true,
//       minifyCSS: true,
//       minifyURLs: true
//     }
//   }
//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
// }

module.exports = webpackConfig
