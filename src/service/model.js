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
  test: '/test',
  getConfig: '/common/initconfig',
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

export default {
  commonParams,
  modelApis,
}
