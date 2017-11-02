// 此文件建议跟着项目走，可随时变更修改、扩展定制

require('es6-promise').polyfill()
import fetch from 'kit-fetch'

// function parseJSON(response) {
//   return response.json()
// }

function checkStatus(response) {
  // response.status >= 200 && response.status < 300
  if (response.ok) {
    return response
  }

  const { status, statusText } = response
  const error = new Error(statusText)
  error.response = response
  error.status = status
  error.statusText = statusText
  // 不能给 error.message 字段赋值，这是只读属性，参见[Error对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  // 如需开启代理或切换 API 域，应在项目中配置 url
  // options.mothod = (options.mothod || 'GET').toUpperCase()
  // if (options.mothod === 'GET') {
  //   url = getUrl(url, options.data)
  // }
  const response = await fetch(url, options)

  checkStatus(response)

  const data = await response.json()

  return data
  // return fetch(url, options)
  //   .then(checkStatus)
  //   .then(parseJSON)
  //   .then(data => ({ data }))
  //   .catch(err => ({ err }))
}
