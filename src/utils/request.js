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
export default async function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
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
