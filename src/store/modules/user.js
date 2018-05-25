import api from '@/config/api'
import cookie from '../cookie'
import storage from '../storage'

const user = {
  state: {
    token: cookie.getToken(),
    userInfo: storage.get('user_info'),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim();
      return new Promise((resolve, reject) => {
        api.login({
          mobile,
          password: userInfo.password,
          login_type: userInfo.loginType,
        }).then((res) => {
          const { data } = res
          const userInfo2 = {
            admin_type: data.admin_type,
            id: data.id,
            merchant_id: data.merchant_id,
            mobile: data.mobile,
            name: data.name,
            role_group: data.role_group,
            role_ids: data.role_ids,
            status: data.status
          }
          cookie.setToken(data.token)
          // auth.setMenu(data.menu_list)
          storage.set('menu', data.menu_list)
          // auth.setUser(userInfo2)
          storage.set('user_info', userInfo2)
          commit('SET_TOKEN', data.token)
          commit('SET_USERINFO', userInfo2)
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', '')
        cookie.removeToken()
        storage.remove('menu')
        storage.remove('user_info')
        resolve()
      })
    }
  }
}

export default user
