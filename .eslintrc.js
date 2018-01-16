// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "extends": [
    "airbnb-base",
    // "vue"
    // "eslint-config-vue": "^2.0.2",
    // "plugin:vue-libs/recommended",
  ],
  // required to lint *.vue files
  "plugins": [
    "vue-libs",
    "import",
    "html",
  ],
  "env": {
    "browser": true,
    "mocha": true,
    "node": true,
  },
  "globals": {
    "window": false,
    "expect": true,
    "sinon": true,
    "Blob": false,
    "URL": false,
    "__DEV__": false,
    "__PROD__": false,
    "__TEST__": false,
    "__WEEX__": true
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // 根据需要修改 rules，详见 http://eslint.org/docs/rules/
  // 推荐的编码风格 https://github.com/airbnb/javascript
  // add your custom rules here
  "rules": {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "comma-dangle": ["error", "always-multiline"],
    "consistent-return": 0,
    "generator-star-spacing": 0,
    "global-require": 0,
    "import/extensions": 0,
    "import/first": 0,
    "import/no-absolute-path": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "linebreak-style": 0,
    "no-bitwise": 0,
    "no-cond-assign": 0,
    "no-continue": 1,
    "no-console": 0,
    "no-else-return": 0,
    "no-mixed-operators": 0,
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "no-trailing-spaces": 0,
    "no-use-before-define": 0,
    "no-useless-escape": 0,
    "prefer-template": 0,
    "prefer-arrow-callback": 0,
    "require-yield": 1,
    "semi": ["error", "never"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "ignore",
      "asyncArrow": "ignore"
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
