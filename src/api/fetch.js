import { stringify } from 'kit-qs';
import env from '@/config/env';
import { storage } from '@/utils/storage';
import { modelApis, commonParams, headers } from '@/api/api.config';
import _request from '@/api/request/fetch';
// import mini from '@/utils/mini';

let apiBaseUrl;
apiBaseUrl = `${env.apiBaseUrl}`;

const regHttp = /^https?/i;

const isMock = false;
// 如果方便的切换使用Mock数据
// const regMock = /^mock?/i

function compact(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'undefined' || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}

function request(url, options, success, fail) {
  const originUrl = regHttp.test(url) ? url : `${apiBaseUrl}${url}`;
  return _request(originUrl, compact(options), success, fail);
}

// 仅限本地调试支持
// if (__DEV__ && env.mock) {
if (env.isMode('dev') && isMock) {
  apiBaseUrl = `${env.apiMockUrl}`;
  // Object.assign(modelApis, require('../mock'))
}

// 线上代理
if (env.isMode('dev') && env.proxy) {
  const proxyUrl = '/proxy';
  apiBaseUrl = `${env.origin}${proxyUrl}`;
}

const { width, height } = window.screen;
const userInfo = storage.get('userInfo') || {};

// 公共参数
headers.init({
  // token: getToken(),
  // userId: userInfo.userId || '', // 用户唯一标志
});
commonParams.init({
  user_id: userInfo.userId || '', // 用户唯一标志
  // udid: '', // 设备唯一标志
  // device: '', // 设备
  // net: '', // 网络
  // timestamp: '', // 时间
  channel: 'h5', // 渠道
  spm: 'h5',
  v: env.version, // 系统版本
  // terminal: env.terminal, // 终端
  swidth: width, // 屏幕宽度 分辨率
  sheight: height, // 屏幕高度
  // location: '', // 地理位置
  zone_id: 857, // 必须
});

const apiList = Object.keys(modelApis).reduce((api, key) => {
  const val = modelApis[key];
  const [url, methodType = 'GET'] = val.split(/\s+/).reverse();
  const method = methodType.toUpperCase();
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
        return request(
          url,
          {
            headers: {
              ...headers.get(),
              // Accept: 'application/json',
              // 我们的 post 请求，使用的这个，不是 application/json
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method,
            data: compact(Object.assign({}, commonParams.get(), params)),
          },
          success,
          fail
        );
      };
      break;
    case 'GET':
    default:
      api[key] = function getRequest(params, success, fail) {
        params = compact(Object.assign({}, commonParams.get(), params));
        let query = stringify(params);
        if (query) query = `?${query}`;
        return request(
          `${url}${query}`,
          {
            headers: {
              ...headers.get(),
            },
          },
          success,
          fail
        );
      };
      break;
  }
  return api;
}, {});

apiList.setCommonParams = commonParams.set;
apiList.getCommonParams = commonParams.get;
apiList.setHeader = headers.set;
apiList.getHeader = headers.get;

export default apiList;
