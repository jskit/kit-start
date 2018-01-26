const rm = require('rimraf')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 清除目录，重新生成
rm(utils.resolve(config.path.dist), () => {})

let webpackConfig = {
  output: {
    path: utils.resolve(config.path.distdll),
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    vendors: config.vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: utils.resolve(config.path.distdll, 'vendors.json'),
      name: '[name]',
      context: '/'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new BundleAnalyzerPlugin({
      reportFilename: 'index.html',
      analyzerMode: 'static',
      openAnalyzer: false,
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.unshift(new webpack.optimize.UglifyJsPlugin());
}

module.exports = webpackConfig
