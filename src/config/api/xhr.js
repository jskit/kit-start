import { stringify } from 'qs'
import _request from '@/utils/request/xhr'
import mini from '@/utils/mini'
import env from '@/config/env'
// import { modelApis, commonParams } from './model'
// import { version } from '../package.json'

const type = 'xhr';
// const type = 'fetch';

let apiBaseUrl
apiBaseUrl = `${env.apiBaseUrl}`

const regHttp = /^https?/i

const isMock = true;
// const regMock = /^mock?/i

function compact(obj) {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}

function request(url, options, success, fail) {
  const originUrl = regHttp.test(url) ? url : `${apiBaseUrl}${url}`

  const { method = 'GET' } = options;
  if (method === 'GET') {
    return request({
      url: originUrl,
      method: 'get',
      params: { token },
    })
  }
  if (options.)
  return _request(originUrl, compact(options), success, fail)
}

/**
 * API 命名规则
 * - 使用 camelCase 命名格式（小驼峰命名）
 * - 命名尽量对应 RESTful 风格，`${动作}${资源}`
 * - 假数据增加 fake 前缀
 * - 便捷易用大于规则，程序是给人看的
 */

// api 列表
// https://dapi.cloudai.net/swagger-ui.html
const modelApis = {
  // 初始化配置
  test: 'https://easy-mock.com/mock/5aa79bf26701e17a67bde1d7/',
  getConfig: '/common/initconfig',
  getWxSign: '/common/getwxsign',

  // 获取七牛 token
  getQiniuToken: '/common/qiniutoken',

  loginByUsername: 'POST /user/login',
  logout: 'POST /user/logout',
  getUserInfo: '/user/info',
  getTableList: '/table/list',

  // 系统管理
  login: 'POST /admin/login',
  // login: 'POST /login/login',
  logout: 'POST /admin/logout',
  adminCheck: '/admin/check',
  menu: '/admin/menu',

  // 用户管理
  userList: '/sys/user/list',
  userRoleList: '/sys/user/role/list',
  saveUser: 'POST /sys/user/save',
  updateUser: 'POST /sys/user/update',
  updateUserPwd: 'POST /sys/user/updatePwd',
  updateUserRole: 'POST /sys/user/role/update',
  delUser: 'POST /sys/user/delete',

  // 权限管理
  savePower: 'POST /sys/permission/save',
  delPower: 'POST /sys/permission/delete',
  updatePower: 'POST /sys/permission/update',

  // 角色管理
  getRoleList: '/sys/role/permission/list',
  saveRole: '/sys/role/save',
  delRole: '/sys/role/delete',
  updateRole: '/sys/role/update',
  updateRolePower: '/sys/role/permission/update',

  // 人员管理
  getPersonalList: '/org/personal/list',
  savePersonal: 'POST /org/personal/save',
  delPersonal: '/org/personal/delete',
  updatePersonal: 'POST /org/personal/update',
  searchPersonal: '/org/personal/save',

  // 人员证书管理
  getResList: '/personal/resource/list',
  saveRes: '/personal/resource/save',
  delRes: '/personal/resource/delete',
  uploadRes: '/personal/resource/upload',
  searchRes: '/personal/resource/search',

  // 部门管理
  getDeptList: '/org/dept/list',
  saveDept: '/org/dept/save',
  delDept: '/org/dept/delete',
  uploadDept: '/org/dept/upload',
  searchDept: '/org/dept/search',
}

// 仅限本地调试支持
// if (__DEV__ && env.mock) {
if (__DEV__ && isMock) {
  apiBaseUrl = `${env.apiMockUrl}`
  // Object.assign(modelApis, require('../mock'))
}

// 线上代理
if (__DEV__ && env.proxy) {
  const proxyUrl = '/proxy'
  apiBaseUrl = `${env.origin}${proxyUrl}`
}

const {
  width,
  height,
} = window.screen

// 公共参数
const commonParams = {
  uuid: '', // 用户唯一标志
  udid: '', // 设备唯一标志
  device: '', // 设备
  net: '', // 网络
  token: '',
  timestamp: '', // 时间
  channel: 'h5', // 渠道
  spm: 'h5',
  v: env.version, // 系统版本
  terminal: env.terminal, // 终端
  swidth: width, // 屏幕宽度 分辨率
  sheight: height, // 屏幕高度
  location: '', // 地理位置
  zoneId: 857, // 必须
}

// console.log(Object.keys(modelApis))

const apiList = Object.keys(modelApis).reduce((api, key) => {
  const val = modelApis[key]
  const [url, methodType = 'GET'] = val.split(/\s+/).reverse()
  const method = methodType.toUpperCase()
  // let originUrl = regHttp.test(url) ? url : `${env.apiBaseUrl}${url}`;
  // NOTE: headers 在此处设置？
  // if (__DEV__ && regLocalMock.test(url)) {
  //   api[key] = function postRequest(params, success, fail) {
  //     const res = require(`../${url}.json`)
  //     mini.hideLoading()
  //     res.errno === 0 ? success(res) : fail(res)
  //   }
  //   return api
  // }
  switch (method) {
    case 'POST':
      // originUrl = `${originUrl}`;
      api[key] = function postRequest(params, success, fail) {
        return request(url, {
          headers: {
            // Accept: 'application/json',
            // 我们的 post 请求，使用的这个，不是 application/json
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          method,
          data: compact(Object.assign({}, getCommonParams(), params)),
        }, success, fail)
      }
      break
    case 'GET':
    default:
      api[key] = function getRequest(params, success, fail) {
        params = compact(Object.assign({}, getCommonParams(), params))
        let query = stringify(params)
        if (query) query = `?${query}`
        return request(`${url}${query}`, {}, success, fail)
      }
      break
  }
  return api
}, {})

function setCommonParams(params) {
  return Object.assign(commonParams, params)
}

function getCommonParams(key) {
  return key ? commonParams[key] : {
    // ...commonParams,
  }
}

apiList.getCommonParams = getCommonParams
apiList.setCommonParams = setCommonParams

// console.log(apiList)

export default apiList
