// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "extends": [
    // "webpack",
    "airbnb-base",
    // 'airbnb',
    // 'prettier',
    // "vue",
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
    "es6": true,
  },
  // true代表允许重写、false代表不允许重写
  "globals": {
    "window": false,
    "expect": true,
    "sinon": true,
    "Blob": false,
    "URL": false,
    "isNaN": false,
    "__DEV__": true,
    "__PROD__": true,
    "__TEST__": true,
    "__ADMIN__": false,
    "__APP__": false,
    "__WEEX__": false,
  },

  // check if imports actually resolve
  // 需要安装 eslint-import-resolver-webpack
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },

  // 根据需要修改 rules，详见 http://eslint.org/docs/rules/
  // 推荐的编码风格 https://github.com/airbnb/javascript
  // add your custom rules here
  "rules": {
    // don"t require .vue extension when importing
    "import/extensions": ["error", "always", {
      "js": "never",
      "vue": "never"
    }],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": ["error", {
      "optionalDependencies": ["test/unit/index.js"]
    }],
    "arrow-body-style": [0],
    "class-methods-use-this": [0],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    "consistent-return": [0],
    "generator-star-spacing": [0],
    "global-require": [0],
    "import/extensions": [0],
    "import/first": [0],
    "import/no-absolute-path": [0],
    "import/no-duplicates": [0],
    "import/no-dynamic-require": [0],
    "import/no-extraneous-dependencies": [0],
    "import/no-named-as-default-member": [0],
    "import/no-named-as-default": [0],
    "import/no-unresolved": [0],
    "import/prefer-default-export": [0],
    "linebreak-style": [0],
    "max-len": ["error", {
      "code": 120,
      "ignoreUrls": true
      // "ignorePattern": true,
    }],
    "no-bitwise": [0],
    "no-cond-assign": [0],
    "no-console": [0],
    "no-else-return": [0],
    "no-mixed-operators": [0],
    "no-multi-spaces": ["error", {
      "ignoreEOLComments": true,
    }],
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxEOF": 1,
    }],
    "no-nested-ternary": [0],
    "no-param-reassign": [0],
    "no-plusplus": [0, {
      "allowForLoopAfterthoughts": true,
    }],
    "no-restricted-syntax": [0],
    "no-shadow": ["error", {
      "allow": [
        "res",
        "err",
        "cb",
        "state",
        "resolve",
        "reject",
        "done"
      ]
    }],
    "no-trailing-spaces": 0,
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
      "allowTaggedTemplates": true,
    }],
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "none",
      "caughtErrors": "none",
      "ignoreRestSiblings": false,
    }],
    "no-use-before-define": [0],
    "no-useless-escape": [0],
    "prefer-template": [0],
    "prefer-arrow-callback": [0],
    "quotes": ["error", "single", {
      "avoidEscape": true,
      "allowTemplateLiterals": true,
    }],
    "require-yield": [1],
    "semi": [0, "never"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "ignore",
      "asyncArrow": "ignore"
    }],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  }
}
