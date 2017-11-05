// 此文件建议跟着项目走，可随时变更修改、扩展定制

require('es6-promise').polyfill()
import fetch from 'kit-fetch'
import { Notification } from 'kit-ui'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  Notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  })
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}) {
  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = { ...defaultOptions, ...options }
  const method = (newOptions.method || 'GET').toUpperCase()
  // newOptions.method = method
  if (method === 'POST' || method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    }
    newOptions.body = JSON.stringify(newOptions.body)
  }

  return await fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch((error) => {
      if (error.code) {
        Notification.error({
          message: error.name,
          description: error.message,
        })
      }
      if ('stack' in error && 'message' in error) {
        Notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        })
      }
      return error
    })
}

/*! fetch 的封装
https://github.github.io/fetch/

Request
@param {String} String | Object - The URL to request, either a String or a Object that return by url.parse
@param {Object} data 数据
@param {Object} options 选项
  - method {String} - Request method, defaults: 'GET'. [GET, POST, DELETE or PUT]
  - body (String, body types) - HTTP request body(可由 data 转换过来)
  - headers (Object, Headers) - Default: {}
  - data {String | Buffer | Readable} - 发送到服务器的数据；如果是get请求，它会自动被作为参数拼接到url上。非String对象将通过 $.param 得到序列化字符串。
  - contentType {String} 发送信息至服务器时内容编码类型。通过设置 false 跳过设置默认值。
      默认：URLSearchParams 'application/x-www-form-urlencoded;charset=utf-8'
      可选：String 'text/plain;charset=utf-8'
           FormData 'multipart/form-data'
           Blob inherited from the blob.type property
      需特殊处理 json
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...
      }
  - dataType 预期服务器返回的数据类型('json', 'jsonp', 'xml', 'html', or 'text') 默认 none
  - timeout {Number} - 设置请求超时时间（毫秒）默认3000，0表示不超时。
  - store {Boolean | Object} 是否使用 store，以及使用时间限制
  - transformRequest {Function} 请求前处理函数
  - transformResponse {Function} 返回数据前处理函数
  - fetchError {Function} 请求错误处理函数

Response
  status (number) - HTTP response code in the 100–599 range
  statusText (String) - Status text as reported by the server, e.g. "Unauthorized"
  ok (boolean) - True if status is HTTP 2xx
  headers (Headers)
  url (String)
*/
