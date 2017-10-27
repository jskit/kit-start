// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {},
    "postcss-position": {},
    "postcss-size": {},
    "postcss-plugin-px2rem": {
      rootValue: 100,
      // unitPrecision: 5,
      // propWhiteList: [],
      // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      // propList: ['*'],
      // propBlackList: [],
      // selectorBlackList: [],
      // ignoreIdentifier: false,
      // replace: true,
      // mediaQuery: false,
      minPixelValue: 0,
    },
  }
}
