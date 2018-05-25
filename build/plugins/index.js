
var vConsolePlugin = require('vconsole-webpack-plugin')

const debug = true

module.exports = [
  new vConsolePlugin({
    filter: [],    // 需要过滤的入口文件
    enable: debug, // 发布代码前记得改回 false
  }),
]
