import axios from 'axios'

const instance = axios.create({
  // baseURL: `${env.apiBaseUrl}`,
  timeout: 1500,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Accept': 'application/json',
    // 'dataType': 'json',
    // 'Content-Type': 'application/json; charset=utf-8',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'text/html; charset=UTF-8',
  },
})

instance.form = function form(url, data) {
  return instance.post(url, data, {
    transformRequest: [function transformRequest(reqData) {
      // Do whatever you want to transform the data
      let ret = ''
      /* eslint guard-for-in: 0 */
      for (const it in reqData) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(reqData[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

function checkStatus({ status, statusText, data }) {
  if (status >= 200 && status < 300) {
    // 请求成功
    // console.log('请求成功: ')
    // console.log(data)
    return data
  } else {
    const error = new Error(statusText)
    error.status = status
    error.message = data
    return Promise.reject(error)
  }
}

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做某事
  return config
}, function err(error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做些事
  return checkStatus(response)
}, function err(error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

/**
 * 创建临时数据
 */
export const setPromise = (data) => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

export default instance
