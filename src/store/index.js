import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './types'

Vue.use(Vuex)

// store 去中心化
const reqModules = require.context('../views', true, /^\.(\/([\s\S])+)?\/store\.js$/)
const modules = reqModules.keys().reduce((module, key) => {
  // export default 语法导出不友好，特殊处理
  const name = key //.replace('.', '').replace('/', '')
  module[name] = reqModules(key).default
  return module
}, {})

const state = {}

const debug = !__PROD__

export default new Vuex.Store({
  strict: debug,
  state,
  actions,
  getters,
  modules: {
    ...modules,
  },
})
