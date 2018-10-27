const path = require('path');
const QiniuPlugin = require('qiniu-webpack-plugin');
const svgoConfig = require('./svgo-config.json');
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const qnConfig = require('./qn.private').hsq || {};

// https://cli.vuejs.org/zh/config/
// https://github.com/HaoChuan9421/vue-cli3-optimization/blob/master/vue.config.js
// webpack4.x 配置优化 https://segmentfault.com/a/1190000015724077

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

// 环境变量
process.env.VUE_APP_VERSION = require('./package.json').version;
process.env.VUE_CDN_DOMAIN = qnConfig.domain;

// vue.config.js
module.exports = {
  // //默认 '/'，子目录可以配置 '/v2/'，设置为''或'./'，输出为相对目录
  // vue-router history模式下 子路由需要 baseUrl : '/' 为绝对路径
  // hash 模式下 baseUrl : './' 没有问题
  baseUrl:
    __DEV__ && qnConfig.domain ? '/' : `${qnConfig.domain}${qnConfig.prefix}`,
  // outputDir: 'dist',
  assetsDir: __DEV__ ? './' : './static',
  configureWebpack: config => {
    // console.log(config);
    config.resolve.extensions.push('.css', '.styl', '.md');
    config.resolve.alias['assets'] = path.resolve('./src/assets');

    const plugins = [];
    if (!__DEV__) {
      // 为生产环境修改配置...
      // plugins.push(new InlineManifestWebpackPlugin())
      if (qnConfig.domain) {
        plugins.push(
          // 七牛
          new QiniuPlugin({
            prefix: qnConfig.prefix,
            ACCESS_KEY: qnConfig.ak,
            SECRET_KEY: qnConfig.sk,
            bucket: qnConfig.bucket,
            path: qnConfig.path,
          })
        );
      }
      return {
        plugins,
      };
    } else {
      // 为开发环境修改配置...
      return {
        plugins,
      };
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    // svgRule.exclude.add('src/icons').end();

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // svgRule.use
    svgRule.uses.clear();

    // 添加要替换的 loader
    // http://tech.lede.com/2018/03/28/fe/svg-icon/
    // https://medium.com/@deeepakampolu/til-using-svg-icon-sprites-with-webpack-2fd4db7ead76
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      // .include.add('src/icons')
      // .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        // 修改它的选项...
        return {
          symbolId: 'icon-[name]',
          // 不要提取成一个外部独立文件使用，这样与按需加载理念冲突
          // extract: true,
          // spriteFilename: 'svg-sprite.[hash:6].svg',
        };
      });

    // 优化SVG大小
    // Error in parsing SVG: Non-whitespace before first tag.
    // https://github.com/kisenka/svg-sprite-loader/issues/236
    // It means that svg-sprite-loader should applies after svgo-loader
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap(options => {
        return {
          ...svgoConfig,
        };
      });
  },
  css: {
    // modules: false,
    sourceMap: !__PROD__,
  },
  // productionSourceMap: !__PROD__,
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: !__PROD__,
  runtimeCompiler: false,
  crossorigin: 'anonymous',
  // transpileDependencies: [],

  // 子资源完整性（SRI）
  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
  integrity: false,
};
