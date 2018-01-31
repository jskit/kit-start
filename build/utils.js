'use strict'

const path = require('path')
const glob = require('glob')
const config = require('../config')
const HappyPack = require('happypack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = config.env['__PROD__']

exports.assetsPath = function (_path) {
  const assetsSubDirectory = isProduction
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 生成css-loader的装载机
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

// Happypack生成器
exports.cHappypack = (id, loaders) => {
  return new HappyPack({
    id: id,
    debug: false,
    verbose: false,
    threads: 4,
    loaders: loaders
  })
}

// 绝对路径生成器
exports.resolve = (localPath, dir = '') => {
  return path.join(process.cwd(), localPath, dir)
}

// 分离多页
exports.getEntries = (globPath) => {
  const entries = {}
  glob.sync(globPath).forEach((entry) => {
    // 过滤router.js
    const basename = path.basename(entry, path.extname(entry), 'router.js')
    entries[basename] = entry
  })
  return entries
}

// exports.createNotifierCallback = () => {
//   const notifier = require('node-notifier')

//   return (severity, errors) => {
//     if (severity !== 'error') return

//     const error = errors[0]
//     const filename = error.file && error.file.split('!').pop()

//     notifier.notify({
//       title: packageConfig.name,
//       message: severity + ': ' + error.name,
//       subtitle: filename || '',
//       icon: path.join(__dirname, 'logo.png')
//     })
//   }
// }
