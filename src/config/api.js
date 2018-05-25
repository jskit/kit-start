import { stringify } from 'qs'
import _request from '@/utils/request'
import mini from '@/utils/mini'
import env from '@/config/env'
// import { modelApis, commonParams } from './model'
// import { version } from '../package.json'

let apiBaseUrl
apiBaseUrl = `${env.apiBaseUrl}`

const regHttp = /^https?/i
const regMock = /^mock?/i

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
const modelApis = {
  // 初始化配置
  test: 'https://easy-mock.com/mock/5aa79bf26701e17a67bde1d7/',
  getConfig: '/common/initconfig',
  getWxSign: '/common/getwxsign',
  // 积分兑换
  getPointIndex: '/point/index',
  getPointList: '/point/skulist',
  getPointDetail: '/point/iteminfo',
  getPointDetaiMore: '/product/productdetail',
  getRList: '/point/recommenditems',
  // 专题
  getPointTopicInfo: '/point/topicinfo',
  getPointTopicList: '/point/topicbuskulist',
  // 主站专题
  getTopicInfo: '/product/topicskusinfo',
  getTopicList: '/product/topicskulist',
  // 个人中心
  getProfile: '/user/usercenter',
  // 拼团相关
  getCoupleList: '/product/coupleskulist',
  getCoupleDetail: '/product/coupleskudetail',
  getMerchantList: '/merchant/coupleskulist',
  coupleOrderInit: 'POST /order/coupleorderinit',
  coupleOrderList: '/user/usercouplelist',
  coupleOrderDetail: '/user/usercoupleorderdetail',
  coupleUserList: '/market/pinactivitiesuserlist', // 分享页拼团头像列表
  coupleShareDetail: '/user/coupleactivitiedetail', // 分享详情

  // 首页
  getIndex: '/common/index',
  getIndexNew: '/common/index_v1',
  getHotSearch: '/common/hotsearchsug',

  // 主流程
  orderInit: 'POST /order/orderinit',
  orderSubmit: 'POST /order/submitorder',
  orderPay: 'POST /order/orderpay',
  orderPayConfirm: '/order/orderpayconfirm', // 确认支付状态
  getUserOrders: '/order/getuserorders', // 订单列表
  getNeedCommentOrders: '/order/waitcommentlist', // 待评论
  getUserRefundorders: '/order/userrefundorder', // 退款
  getUserServiceOrders: '/order/userserviceorders', // 售后
  orderCancel: 'POST /order/cancelorder', // 取消订单
  orderDetail: '/order/orderdetail',
  confirmReceived: 'POST /order/userorderconfirm', // 确认收货
  orderComplaint: 'POST /refund/complaint', // 订单申诉
  // 积分订单相关
  pointOrderInit: 'POST /tradecenter/pointorderpreview',
  pointOrderSubmit: 'POST /tradecenter/pointordersubmit',
  pointOrderCancel: 'POST /tradecenter/ordercancel',
  pointOrderList: '/tradecenter/orderlist',
  pointOrderDetail: '/tradecenter/orderinfo',
  pointOrderSuccess: '/tradecenter/ordersuccess',

  // 退款相关
  refundInit: '/refund/init',
  refundDetail: '/refund/detail',
  refundApply: 'POST /refund/apply',
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
  // 获取七牛 token
  getQiniuToken: '/common/qiniutoken',
}

// 仅限本地调试支持
if (__DEV__ && env.mock) {
  apiBaseUrl = `${env.apiBaseUrl}`
  Object.assign(modelApis, require('./mock'))
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
  uid: '',
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
  if (__DEV__ && regMock.test(url)) {
    api[key] = function postRequest(params, success, fail) {
      const res = require(`../${url}.json`)
      mini.hideLoading()
      res.errno === 0 ? success(res) : fail(res)
    }
    return api
  }
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

export function setCommonParams(params) {
  return Object.assign(commonParams, params)
}

export function getCommonParams(key) {
  return key ? commonParams[key] : { ...commonParams }
}

apiList.getCommonParams = getCommonParams
apiList.setCommonParams = setCommonParams

// console.log(apiList)

export default apiList
