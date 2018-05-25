import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/config/api'
import types from './types'

import app from './modules/app'
// import user from './modules/user'

Vue.use(Vuex)

// store 去中心化
// const reqModules = require.context('../views', true, /^\.(\/([\s\S])+)?\/store\.js$/)
// console.log(reqModules)
// const modules = reqModules.keys().reduce((module, key) => {
//   // export default 语法导出不友好，特殊处理
//   const name = key // .replace('.', '').replace('/', '')
//   module[name] = reqModules(key).default
//   return module
// }, {})

export const TEST = 'TEST'

// initial state
const state = {
  test: '',
  app: {},
  userInfo: {},
}

// getters
const getters = {
  config: state => state.app.config,
  // token: state => state.user.token,
  // userInfo: state => state.user.userInfo,
}

// actions
const actions = {
  [TEST]({ commit }, data) {
    api.TEST({}, (res) => {
      commit(TEST, res.data)
    })
  },
}

// mutations
const mutations = {
  [TEST](state, data = {}) {
    state.test = data
  },
}

const debug = __DEV__

export default new Vuex.Store({
  strict: debug,
  types,
  state,
  actions,
  getters,
  mutations,
  modules: {
    app,
    // user,
    // ...modules,
  },
})
