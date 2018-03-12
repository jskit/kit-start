'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const loadMinified = require('./load-minified')

const isTesting = config.env['__TEST__']

console.log('index')
console.log(config.build.index)
console.log(config.build.assetsRoot)

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
    //   compress: {
    //     warnings: false
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
    // 如果同时引入了html-loader和html-webpack-plugin，两个插件都设置了minify属性，则会编译生成时报错
    new HtmlWebpackPlugin({
      filename: isTesting
        ? 'index.html'
        : config.build.index,
      template: config.template, // 'src/index.tpl'
      favicon: config.favicon,
      inject: true,
      title: 'jskit',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`,
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
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
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve(config.path.static),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      // webpack中JS手动引入的图片问题(按照约定，assets内全为需要编译的图片，不需要的放在 static 下)
      // webpack是万物皆模块，但也就是说，不通过require引入的就不会算成模块了(插件中的另算，那是处理过的)。所以，在JS中手动引入图片时会遇到问题就是对应的图片并不会被打包，导致之后找不到路径。
      //{
      //  from: 'src/assets',
      //  to: config.build.assetsSubDirectory,
      //  ignore: ['.*']
      //}
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'kit-start',
      filename: 'service-worker.js',
      staticFileGlobs: [`${config.path.dist}/**/*.{js,html,css}`],
      minify: true,
      stripPrefix: `${config.path.dist}/`,
    })
  ]
})

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
