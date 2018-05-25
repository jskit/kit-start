
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/config/api'

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

export const types = {

}

// initial state
const state = {
  all: [],
}

// getters
const getters = {
  config: state => state.app.config,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  addRouters: state => state.permission.addRouters,
  allProducts: state => state.all,
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    api.getProducts((products) => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  },
  addToCart: ({ commit }, product) => {
    if (product.inventory > 0) {
      commit(types.ADD_TO_CART, {
        id: product.id,
      })
    }
  },
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
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
    // app,
    // user,
    // ...modules,
  },
})
