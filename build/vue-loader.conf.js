'use strict'

const utils = require('./utils')
const config = require('../config')

const isProduction = config.env['__PROD__']
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    // 提取样式
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: 'src', // ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
