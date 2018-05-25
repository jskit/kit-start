import Cookies from 'js-cookie'

const tokenKey = 'dwdus_sid'
// const uidKey = 'dwd_hsq_guid'

export default {
  getToken() {
    return Cookies.get(tokenKey) || '';
  },
  setToken(token) {
    return Cookies.set(tokenKey, token)
  },
  removeToken() {
    return Cookies.remove(tokenKey)
  },
}
