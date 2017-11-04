import { stringify } from 'qs'
import _request from '../utils/request'

const __DEV__ = false
const proxyUrl = __DEV__ ? '/proxy' : ''
const apiBaseUrl = '//m.api.haoshiqi.net'
const apiUrl = __DEV__ ? proxyUrl : apiBaseUrl + proxyUrl

function request(url, params) {
  return _request(`${apiUrl}/api${url}`, params)
}

/**
 * API 命名规则
 * - 使用 camelCase 命名格式（小驼峰命名）
 * - 命名尽量对应 RESTful 风格，`${动作}${资源}`
 * - 假数据增加 fake 前缀
 * - 便捷易用大于规则，程序是给人看的
 */

export function queryProjectNotice() {
  return request('/project/notice')
}

export function queryActivities() {
  return request('/activities')
}

export function queryRule(params) {
  return request(`/rule?${stringify(params)}`)
}

export function removeRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  })
}

export function addRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  })
}

export function fakeSubmitForm(params) {
  return request('/forms', {
    method: 'POST',
    body: params,
  })
}

export function fakeChartData() {
  return request('/fake_chart_data')
}

export function queryTags() {
  return request('/tags')
}

export function queryBasicProfile() {
  return request('/profile/basic')
}

export function queryAdvancedProfile() {
  return request('/profile/advanced')
}

export function fakeQueryList(params) {
  return request(`/fake_list?${stringify(params)}`)
}

export function fakeAccountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    body: params,
  })
}

export function fakeMobileLogin(params) {
  return request('/login/mobile', {
    method: 'POST',
    body: params,
  })
}

export function fakeRegister(params) {
  return request('/register', {
    method: 'POST',
    body: params,
  })
}

export function queryNotices() {
  return request('/notices')
}
