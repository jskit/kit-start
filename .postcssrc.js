// https://github.com/michael-ciniawsky/postcss-load-config
var colourPalette = require('colour-palette')

module.exports = (ctx) => ({
  // parser: false,
  // map: ctx.env === 'development' ? 'inline' : false,
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    // "autoprefixer": {},
    "postcss-cssnext": {}, // 已包含 autoprefixer
    // position: absolute 0 * 0 0
    // "postcss-short-position": {},
    "postcss-normalize-positions": {}, // background-position: bottom right
    "postcss-size": {},
    "postcss-pxtorem": {
      // px单位大写将忽略转化rem
      rootValue: 100,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [/^html$/],
      replace: true,
      mediaQuery: false,
      // minPixelValue: 2,
      minPixelValue: 0
    },
    /* eslint key-spacing: 0 */
    // const colors = {
    //   blue   : '#108ee9',
    //   purple : '#7265e6',
    //   cyan   : '#00a2ae',
    //   green  : '#00a854',
    //   pink   : '#f5317f',
    //   red    : '#f04134',
    //   orange : '#f56a00',
    //   yellow : '#ffbf00',
    // }
    "postcss-functions": {
      functions: {
        colorIndex: function(color, index) {
          return colourPalette(color, index)
        },
      }
    },
  }
})
