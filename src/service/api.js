import { stringify } from 'qs'
import _request from '../utils/request'
import env from '../config/env'
// import { version } from '../package.json'

const proxyUrl = __DEV__ ? '/proxy' : ''
const apiBaseUrl = __DEV__ ? proxyUrl : `${env.apiBaseUrl}${proxyUrl}`
const regHttp = /^https?/i

function request(url, options) {
  const originUrl = regHttp.test(url) ? url : `${apiBaseUrl}${url}`
  return _request(originUrl, options)
}


/**
 * API 命名规则
 * - 使用 camelCase 命名格式（小驼峰命名）
 * - 命名尽量对应 RESTful 风格，`${动作}${资源}`
 * - 假数据增加 fake 前缀
 * - 便捷易用大于规则，程序是给人看的
 */

const modelApis = {
  getAlipay: '/campaign/lotteryWithLogonInfo.json',
  getPointIndex: '/point/index',
  getPointList: '/point/skulist',
  getPointDetail: '/point/iteminfo',
  getPointDetaiMore: '/product/productdetail',
  getRList: '/point/recommenditems',
  // 专题
  getTopicInfo: '/point/topicinfo',
  getTopicList: '/point/topicbuskulist',
  // 个人中心
  getProfile: '/user/usercenter',
  // 订单相关
  orderInit: 'POST /tradecenter/pointorderpreview',
  orderSubmit: 'POST /tradecenter/pointordersubmit',
  orderCancel: 'POST /tradecenter/ordercancel',
  orderList: '/tradecenter/orderlist',
  orderDetail: '/tradecenter/orderinfo',
  orderSuccess: '/tradecenter/ordersuccess',
  // 登录注销
  login: 'POST /user/login',
  logout: 'POST /user/logout',
  // 地址管理
  addressList: '/user/addresslist',
  addAddress: 'POST /user/addaddress',
  updateAddress: 'POST /user/updateaddress',
  setDefaultAddress: 'POST /user/setdefaultaddress',
  deleteAddress: 'POST /user/deleteaddress',
  provinceList: '/nation/provincelist',
  cityList: '/nation/citylist',
  districtList: '/nation/districtlist',
  // 查看物流
  getDelivery: '/order/deliverymessage',
}

const commonParams = {
  uuid: '', // 用户唯一标志
  udid: '', // 设备唯一标志
  device: '', // 设备
  net: '', // 网络
  uid: '',
  token: '',
  timestamp: '', // 时间
  channel: '', // 渠道
  spm: '',
  // v: version, // 系统版本
  terminal: 'wap', // 终端
  swidth: '', // 屏幕宽度
  sheight: '', // 屏幕高度
  location: '', // 地理位置
}

// console.log(Object.keys(modelApis))

const models = Object.keys(modelApis).reduce((api, key) => {
  const val = modelApis[key]
  const [url, methodType = 'GET'] = val.split(/\s+/).reverse()
  const method = methodType.toUpperCase()
  // let originUrl = regHttp.test(url) ? url : `${env.apiBaseUrl}${url}`;
  switch (method) {
    case 'POST':
      // originUrl = `${originUrl}`;
      api[key] = function postRequest(params) {
        return request(url, {
          method,
          data: Object.assign({}, getCommonParams(), params),
        })
      }
      break
    case 'GET':
    default:
      api[key] = function getRequest(params) {
        params = Object.assign({}, getCommonParams(), params)
        return request(`${url}?${stringify(params)}`)
      }
      break
  }
  return api
}, {})

export function setCommonParams(params) {
  return Object.assign(commonParams, params)
}

export function getCommonParams() {
  return { }
  // return { ...commonParams }
}

models.getCommonParams = getCommonParams
models.setCommonParams = setCommonParams

// console.log(models)

export default models
