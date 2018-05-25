
export default {
  script: {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "build:report": "npm_config_report=true node build/build.js",
    "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs",
    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e"
  },
  // 这些组件极易失败，被伟大的墙挡住了
  "phantomjs-prebuilt": "^2.1.15",
  "chromedriver": "^2.33.1",
  "karma-chrome-launcher": "^2.2.0",
  "karma-phantomjs-launcher": "^1.0.4",
  "karma-phantomjs-shim": "^1.5.0",
}
