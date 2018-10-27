import Mock from 'mockjs';
import env from '@/config/env';
import api from '@/api';
import loginAPI from './login';
// import sysApi from './sys';
// import api from './article';
// import api from './remoteSearch';
// import api from './transaction';

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function(...rest) {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...rest);
};
// Mock.setup({
//   timeout: '350-600'
// })

// https://github.com/nuysoft/Mock/wiki/Mock.mock()
// 从 1.0 开始，Mock.js 通过覆盖和模拟原生 XMLHttpRequest 的行为来拦截 Ajax 请求，不再依赖于第三方 Ajax 工具库（例如 jQuery、Zepto 等）。
if (env.isMode('dev')) {
  // 用户相关
  Mock.mock(/\/user\/login/, 'post', loginAPI.login);
  Mock.mock(/\/user\/logout/, 'post', loginAPI.logout);
  Mock.mock(/\/user\/register/, 'post', loginAPI.logout);
  Mock.mock(/\/user\/forgot/, 'post', loginAPI.logout);
  Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);

  Mock.mock(/\/sys\/menu/, 'get', require('./json/menu'));
  Mock.mock(/\/sys\/account/, 'get', require('./json/menu'));
  Mock.mock(/\/sys\/role/, 'get', require('./json/menu'));
  Mock.mock(/\/sys\/notice/, 'get', require('./json/menu'));
  Mock.mock(/\/sys\/dict/, 'get', require('./json/menu'));
  Mock.mock(/\/sys\/job/, 'get', require('./json/menu'));

  // 文章相关
  Mock.mock(/\/article\/list/, 'get', api.getList);
  Mock.mock(/\/article\/detail/, 'get', api.getArticle);
  Mock.mock(/\/article\/pv/, 'get', api.getPv);
  Mock.mock(/\/article\/create/, 'post', api.createArticle);
  Mock.mock(/\/article\/update/, 'post', api.updateArticle);

  // 搜索相关
  Mock.mock(/\/search\/user/, 'get', api.searchUser);

  // 账单相关
  Mock.mock(/\/transaction\/list/, 'get', api.getList);

  // Examples
  // Table
  Mock.mock(/\/table\/list/, 'get', api.getTableList);
  Mock.mock(/\/user\/list/, 'get', api.getUserList);
  Mock.mock(/\/user\/account/, 'get', api.getAccountList);
}

export default Mock;

// 'mock/xxx' 需要带mock标识

// export default {
//   getIndexNew: 'mock/index1',
//   loginByUsername: 'mock/login',
//   logout: 'mock/logout',
//   getUserInfo: 'mock/userInfo',
//   getTableList: 'mock/tableList',
// }
