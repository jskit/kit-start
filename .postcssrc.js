// https://github.com/michael-ciniawsky/postcss-load-config

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
  }
}
