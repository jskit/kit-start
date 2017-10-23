import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './types'

Vue.use(Vuex)

// store 去中心化
const reqFiles = require.context('../views', true, /^\.(\/([\s\S])+)?\/store\.js$/)
const stores = reqFiles.keys().reduce((module, key) => {
  // export default 语法导出不友好，特殊处理
  const name = key //.replace('.', '').replace('/', '')
  module[name] = reqFiles(key).default
  return module
}, {})

const state = {}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state,
  actions,
  getters,
  modules: {
    ...stores,
  },
})
