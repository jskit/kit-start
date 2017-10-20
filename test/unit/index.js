import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js & index.tpl for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.

// const excludeReg =  /^\.\/(?!main(\.js)?|index\.tpl$)/
// const excludeReg = /^\.\/(?!(main(\.js)?|index\.tpl)$)/
// 这里要使用正则表达式，而不能间接赋值使用变量（排除 main 以及 index.tpl 文件）
const srcContext = require.context('../../src', true, /^\.\/(?!(main(\.js)?|index\.tpl)$)/)
srcContext.keys().forEach(srcContext)
