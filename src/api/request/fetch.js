// 此文件建议跟着项目走，可随时变更修改、扩展定制

// 低版本浏览器需要，如IE
// require('es6-promise').polyfill()
// import Promise from 'bluebird'
import fetch from 'kit-request/fetch';
// import { stringify } from 'kit-qs';
import mini from '@/utils/mini';
import router from '@/router';
// Toast

// const mini = {
//   hideLoading() {},
//   showToast() {},
// }

function noop() {
  console.error('异常流程，不应该进入这里');
}

// Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
//

// 跨域设置默认好像已经设定
const defaultOptions = {
  // silent
  method: 'GET', // 使用的HTTP动词，GET, POST, PUT, DELETE, HEAD
  url: '', // 请求地址，URL of the request
  headers: {
    // Accept: 'application/json',
    // Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
    // 'content-type': 'application/json' // 默认值
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  dataType: 'json',
  // data: '',
  mode: 'cors', // 请求的模式，主要用于跨域设置，cors, no-cors, same-origin
  timeout: 30000,
  // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. Origin 'http://127.0.0.1:8090' is therefore not allowed access.
  credentials: 'include', // 是否发送Cookie，默认是`omit`忽略, same-origin
  // redirect // 收到重定向请求之后的操作，follow, error, manual
  // integrity // 完整性校验
  cache: 'default', // 缓存模式(default, reload, no-cache)
};

// response
// type – basic, cors
// url
// useFinalURL – 是否为最终地址
// status – 状态码 (ex: 200, 404, etc.)
// ok – 是否成功响应 (status in the range 200-299)
// statusText – status code (ex: OK)
// headers – 响应头

// const errCode = {
//   11: '无权跨域',
//   12: '网络出错',
//   13: '超时',
//   14: '解码失败',
//   19: 'HTTP错误',
// };

function checkStatus(res = {}) {
  console.log('check');
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
    // res.ok = true
    // if (res.data && res.data.errno === 0) {
    //   return res.data
    // }
    // const error = new Error(res.data)
    // // error.res = res.data
    // throw res.data
  }
  // if (errCode[status]) {
  //   mini.showToast(`${status}: ${errCode[status]}`)
  // }
  // const error = new Error(status)
  // error.res = res
  // throw {
  //   error,
  //   errno: status,
  //   errmsg: errCode[status] || '网络请求错误',
  // }
}

export default function request(
  url,
  options = {},
  success = noop,
  fail = noop
) {
  const newOptions = Object.assign({}, defaultOptions, options);
  const method = (newOptions.method || 'GET').toUpperCase();
  const { headers } = newOptions;
  newOptions.method = method;
  if (method === 'GET') {
    newOptions.headers = {
      // 我们的get请求 不需要这个
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    };
    // newOptions.data = JSON.stringify(newOptions.data)
  } else if (method === 'POST') {
    newOptions.headers = {
      // Accept: 'application/json',
      // 我们的 post 请求，使用的这个，不是 application/json
      'Content-Type': 'application/json; charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    };
    Object.defineProperty(newOptions, 'body', {
      value: `${JSON.stringify(newOptions.data)}`,
    });
    // newOptions.body = `${stringify(newOptions.data)}`
    // newOptions.data = `${stringify(newOptions.data)}`
  }

  const resolve = data => {
    mini.hideLoading();
    if (typeof success === 'function') {
      success(data);
    }
  };
  const reject = (err = {}) => {
    mini.hideLoading();
    if (typeof fail === 'function' && fail(err)) {
      return;
    }
    const { errmsg = '网络异常，请稍后重试', errno = 'err' } = err;
    if (errno === 401) {
      router.replace({
        path: '/401',
        replace: true,
        query: { noGoBack: true },
      });
      // mini.goPage('login', { replace: true })
    } else {
      const message = `${errno}: ${errmsg}`;
      console.log('errmsg:', message);
      mini.showToast(message);
    }
  };

  function log(res) {
    // console.log('44444444');
    console.log(`api: ${method} ${res.status} ${url}`);
    return res;
  }

  fetch(url, newOptions)
    .then(log)
    .then(checkStatus)
    .then(response => response.json())
    .then(
      (res = {}) => {
        console.log(res);
        // const { data = {} } = res
        // if (status >= 200 && status < 300) {
        //   res.ok = true
        if (res.statusCode === 0) {
          resolve(res);
        } else {
          // console.log('err:', res)
          reject({
            errno: res.statusCode,
            errmsg: res.message,
          });
        }
        // } else {
        //   // 小程序未处理过的错误
        //   console.log('fetch 异常:', res)
        //   reject(new Error(data))
        // }
      },
      (err = {}) => {
        // 异常错误
        console.log('fail:', err);
        // err: {
        //   error: 12,
        //   errorMessage: '',
        // }
        // mini.alert({
        //   title: 'err: ' + JSON.stringify(err),
        // });
        reject({
          errno: err.statusCode,
          errmsg: err.message,
        });
      }
    );

  // 把 Promise 封装成回调来使用
  // fetch(url, options).then((success) => {

  // }, (err) => {

  // })

  // 使用 Promise 不爽的地方
  // 统一处理错误信息，没法根据页面错误函数处理的结果来判断
  // 改为回调形式来使用，以支持此能力（Promise 无法实现 finally 最后调用）
  // return new Promise((resolve, reject) => {
  //   // 一个被 reject 的 promise, 后续的 then queue 都不会执行。。。
  //   mini.httpRequest(Object.assign({}, newOptions, {
  //     url: url, // 目标服务器 url
  //     success: (res = {}) => {
  //       console.info(`请求 ${url} ${res.status}`);
  //       console.info(res);
  //       const { status, data = {} } = res
  //       if (status >= 200 && status < 300) {
  //         res.ok = true;
  //         if (data.errno === 0) {
  //           resolve(data);
  //         } else {
  //           console.log(data);
  //           reject(data);
  //         }
  //       } else {
  //         // 小程序未处理过的错误
  //         reject(new Error(data));
  //       }
  //     },
  //     fail: (err = {}) => {
  //       // 小程序处理过的错误
  //       console.log('httpRequest 请求错误', err);
  //       reject(err);
  //     },
  //     complete: () => {
  //       mini.hideLoading();
  //     },
  //   }));
  // })
  // // .then(checkStatus)
  // // 等效 catch
  // // .then(undefined, function onRejected(err = {}) {
  // //   console.log('onFulfilled:', err);
  // //   const { errmsg = '接口错误', errno } = err;
  // //   if (errno === 510010) {
  // //     mini.goPage("login");
  // //   } else {
  // //     mini.showToast(`${errno}: ${errmsg}`);
  // //   }
  // //   const error = new Error(errno);
  // //   error.message = errmsg;
  // //   throw error;
  // // })
  // .catch((err = {}) => {
  //   const { errmsg = '网络异常，请稍后重试', errno } = err;
  //   if (errno === 510010) {
  //     mini.goPage("login");
  //   } else {
  //     mini.showToast(`${errno}: ${errmsg}`);
  //   }
  //   const error = new Error() || {};
  //   throw {
  //     errno,
  //     errmsg: errmsg || '数据格式化出现错误',
  //   };
  // });
  // // .then(function onFulfilled(res) {
  // //   console.log('onFulfilled:', res);
  // // }, function onRejected(err) {
  // //   console.log('onFulfilled:', err);
  // // })
}
