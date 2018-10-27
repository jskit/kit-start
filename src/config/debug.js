import { parse } from 'kit-qs';
// import Cache from '@/store/cache'
// import qs from 'query-string'
// var aa = qs.parse('https://m.iqianggou.com/?from=singlemessage&isappinstalled=0#bargain?id=646156&platform=5')
// console.log(aa)

// const caches = new Cache(100)

// 取参数以及debug调试
// https://m.iqianggou.com/?from=singlemessage&isappinstalled=0#bargain?id=646156&platform=5

const { location } = window;

const params = parse(location.href) || {};

// const search = location.search.replace('?', '')
// const hash = (location.href.split('#')[1] || '').split('?')[1]
// const params = qs.parse(search || hash || '') || {}

// function getQuery(url, key) {
//   return qs.parse
// }

// let isDebug = false
// const debugParams = [
//   'd_debug',
//   'd_host',
//   'd_console',
//   'd_mock',
//   'd_channel',
// ]

// for (const key in params) {
//   if (debugParams.indexOf(key) && params[key]) {
//     isDebug = true
//   }
// }
const debug = {
  params,
  // setQuery(key, value) {
  //   if (key) {
  //     params[key] = value
  //     return params
  //   }
  //   Object.assign(params, value)
  // },
  // getQuery(key, url) {
  //   return key ? (params[key] || '') : params
  // },
  debug: params.d_debug,
  host: params.d_host,
  console: params.d_console,
  mock: params.d_mock,
  // proxy: params.d_proxy,
  channel: params.d_channel,
};

export default debug;
