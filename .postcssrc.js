// https://github.com/michael-ciniawsky/postcss-load-config
var colourPalette = require('colour-palette')

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {},
    "postcss-position": {},
    "postcss-size": {},
    "postcss-pxtorem": {
      rootValue: 100,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [/^html$/],
      replace: true,
      mediaQuery: false,
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
}
