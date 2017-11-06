var path = require('path')
var chalk = require('chalk')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-build-notifier')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // context: path.resolve(__dirname, "../"),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.env['__PROD__']
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@root': resolve('./'),
      '@': resolve('src'),
      'assets': path.resolve(__dirname, '../src/assets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /(libs|node_modules)/,
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')]
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
        // include: svgDirs,
        // include: path.resolve('./img/system'),
        options: {
          runtimeCompat: true,
          // 不要提取成一个外部独立文件使用，这样与按需加载理念冲突
          // extract: true,
          // spriteFilename: 'svg-sprite.[hash:6].svg'
        },
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
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
      logo: config.logo || resolve('/static/img/logo.png'),
      successSound: 'Submarine',
      failureSound: 'Glass',
      suppressSuccess: true
    }),
    ...config.plugins,
  ],
}
