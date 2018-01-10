import { stringify } from 'qs'
import xhr from '../utils/xhr'
import env from '../config/env'


const proxyUrl = __DEV__ ? '/proxy' : ''
const apiBaseUrl = `${env.apiBaseUrl}`

xhr.defaults.baseURL = __DEV__ ? proxyUrl : apiBaseUrl + proxyUrl


export function getPointIndex(params) {
  return xhr(`/point/index?${stringify(params)}`)
}

// getPointIndex({
//   params: {
//     page: this.pager.current,
//   },
// })
