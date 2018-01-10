/**
 * API 命名规则
 * - 使用 camelCase 命名格式（小驼峰命名）
 * - 命名尽量对应 RESTful 风格，`${动作}${资源}`
 * - 假数据增加 fake 前缀
 * - 便捷易用大于规则，程序是给人看的
 */

// api 列表
const modelApis = {
  // 登录注销
  login: 'POST /user/login',
  logout: 'POST /user/logout',
  getPointIndex: '/point/index',
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
