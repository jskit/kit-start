import { stringify } from 'qs'
import _request from '../utils/request'
import env from '../config/env'
import { modelApis, commonParams } from './api'
// import { version } from '../package.json'

const proxyUrl = __DEV__ ? '/proxy' : ''
const apiBaseUrl = __DEV__ ? proxyUrl : `${env.apiBaseUrl}${proxyUrl}`
const regHttp = /^https?/i

function request(url, options) {
  const originUrl = regHttp.test(url) ? url : `${apiBaseUrl}${url}`
  return _request(originUrl, options)
}

// console.log(Object.keys(modelApis))

const models = Object.keys(modelApis).reduce((api, key) => {
  const val = modelApis[key]
  const [url, methodType = 'GET'] = val.split(/\s+/).reverse()
  const method = methodType.toUpperCase()
  // let originUrl = regHttp.test(url) ? url : `${env.apiBaseUrl}${url}`;
  switch (method) {
    case 'POST':
      // originUrl = `${originUrl}`;
      api[key] = function postRequest(params) {
        return request(url, {
          method,
          data: Object.assign({}, getCommonParams(), params),
        })
      }
      break
    case 'GET':
    default:
      api[key] = function getRequest(params) {
        params = Object.assign({}, getCommonParams(), params)
        return request(`${url}?${stringify(params)}`)
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

models.getCommonParams = getCommonParams
models.setCommonParams = setCommonParams

// console.log(models)

export default models
