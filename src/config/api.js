import { stringify } from 'qs'
import _request from '../utils/request'
import mini from '../utils/mini'
import env from './env'
import { modelApis, commonParams } from './model'
// import { version } from '../package.json'

const debug = true

let apiBaseUrl
apiBaseUrl = `${env.apiBaseUrl}`
if (__DEV__ && debug) {
  const proxyUrl = '' // '/proxy'
  apiBaseUrl = `${env.apiBaseUrl}${proxyUrl}`

  const testApi = {
    getIndexNew: 'mock/index1',
  }
  Object.assign(modelApis, testApi)
}
const regHttp = /^https?/i
const regMock = /^mock?/i

function request(url, options, success, fail) {
  const originUrl = regHttp.test(url) ? url : `${apiBaseUrl}${url}`
  return _request(originUrl, options, success, fail)
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
          data: Object.assign({}, getCommonParams(), params),
        }, success, fail)
      }
      break
    case 'GET':
    default:
      api[key] = function getRequest(params, success, fail) {
        params = Object.assign({}, getCommonParams(), params)
        return request(`${url}?${stringify(params)}`, {}, success, fail)
      }
      break
  }
  return api
}, {})

export function setCommonParams(params) {
  return Object.assign(commonParams, params)
}

export function getCommonParams() {
  return { ...commonParams }
}

apiList.getCommonParams = getCommonParams
apiList.setCommonParams = setCommonParams

// console.log(apiList)

export default apiList
