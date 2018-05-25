// import device from '@/utils/device'
import api from '@/config/api'
import storage from '../storage'

export const INIT_CONFIG = 'INIT_CONFIG'
export const SELECT_CITY = 'SELECT_CITY'
// export const GET_PROVINCE = 'GET_PROVINCE'

const defaultCity = {
  id: 857,
  province: '上海',
}

const app = {
  state: {
    config: {},
    province: [],
    selectCity: { ...defaultCity },
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
    [INIT_CONFIG](state, data = {}) {
      state.config = data
      storage.set('config', data)
    },
    // [GET_PROVINCE](state, data = []) {
    //   state.provice = data
    //   storage.set('provice', data)
    // },
    [SELECT_CITY](state, data = []) {
      state.selectCity = data
      storage.set('selectCity', data)
    },
  },
  actions: {
    [INIT_CONFIG]({ commit }) {
      api.getConfig({}, (res) => {
        commit(INIT_CONFIG, res.data)
      }, (err) => {
        // commit(INIT_CONFIG)
      })
    },
    [SELECT_CITY]({ commit, data = { } }) {
      commit(SELECT_CITY, data)
    },
    // [GET_PROVINCE]({ commit }) {
    //   api.provinceList({}, (res) => {
    //     const { list = [] } = res.data
    //     commit(GET_PROVINCE, list)
    //   }, (err) => {
    //     // commit(INIT_CONFIG)
    //   })
    // },
  },
}

export default app
