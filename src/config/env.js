// ENV

import { version } from '../../package.json'
import device from '@/utils/device'
import debug from '@/config/debug'

// 自动判断环境，支持 debug 调试
// 取参数以及debug调试
const { location } = window
const { params } = debug
const prodHost = 'm.haoshiqi.net'

let channel = 'h5'
let terminal = 'wap'
if (device.alipay) {
  channel = params.channel_id || 'alipay_ant' // huabei
  terminal = 'alipay'
}

console.info('version:', version)
console.info('channel:', channel)
console.info('terminal:', terminal)

export const ENV = {
  prod: {
    stage: 'prod',
    baseUrl: 'https://m.haoshiqi.net',
    apiBaseUrl: 'https://m.api.haoshiqi.net',
  },
  dev: {
    stage: 'dev',
    baseUrl: 'http://m.dev.haoshiqi.net',
    apiBaseUrl: 'http://m.devapi.haoshiqi.net',
  },
  beta: {
    stage: 'beta',
    baseUrl: 'https://m.beta.haoshiqi.net',
    apiBaseUrl: 'https://m.betaapi.haoshiqi.net',
  },
  test: {
    stage: 'test',
    routerMode: 'hash',
    baseUrl: location.origin, // 当前地址ip 可以取当前 location.origin
    apiBaseUrl: 'http://m.devapi.haoshiqi.net',
  },
  local: {
    stage: 'local',
    routerMode: 'hash',
    baseUrl: location.origin, // localhost
    apiBaseUrl: 'http://m.devapi.haoshiqi.net',
    // apiBaseUrl: 'http://m.betaapi.haoshiqi.net',
    // apiBaseUrl: 'http://m.api.haoshiqi.net',
  },
}

/*
# nginx

location / {
  index index.html;
  try_files $uri $uri/ /index.html;
}

# 指定v2子目录时
location /v2 {
  alias v2 /data/hsq/v2;
  index index.html;
  try_files $URI $uri/ /v2/index.html;
}
*/
const baseEnv = {
  ...debug,
  version,  // 应用版本
  channel, // 渠道信息
  terminal, // 终端
  stage: 'prod', // 发行版本
  spm: '', // spm
  port: 8001,
  base: 'v2',
  baseUrl: 'https://m.haoshiqi.net',
  apiBaseUrl: 'https://m.api.haoshiqi.net',
  routerMode: 'history',
  // googleAnalyticsId: 'UA-XXXXX-X',
  // baiduAnalyticsId: 'UA-XXXXX-X',
  publicPath: '',
  origin: location.origin,
  isEnv(current) {
    const { stage } = this
    return stage === current || (Array.isArray(current) && current.indexOf(stage) > -1)
  },
  envDebug(...rest) {
    console.warn('仅限临时使用')
    if (!rest) return false
    // 传入期望的环境，返回true，默认prod为false
    return rest.indexOf('dev') > -1
  },
}

const regDev = /^(m\.dev\.haoshiqi\.net)/i
const regBeta = /^(m\.beta\.haoshiqi\.net)/i
const regProd = /^(m\.haoshiqi\.net)/i
const regLocal = /^(localhost|127\.)/i
const regLocalIp = /^(10\.|192\.)/i
// const { protocol, host = ENV.prod.host, origin = ENV.prod.baseUrl } = location

function createEnv(opts = {}) {
  const { env = 'prod' } = opts
  const {
    host = prodHost,
  } = location
  const prodEnv = { ...baseEnv, ...ENV.prod }
  if (host.match(regProd)) {
    return prodEnv
  }
  if (host.match(regBeta)) {
    return { ...prodEnv, ...ENV.beta }
  }

  if (host.match(regDev)) {
    return { ...prodEnv, ...ENV.dev }
  }

  const isLocal = host.match(regLocal)
  const isLocalIp = host.match(regLocalIp)
  if (isLocal || isLocalIp) {
    return { ...prodEnv, ...ENV.local,
      // baseUrl: `${origin}/#`,
      // apiBaseUrl: `${origin}`,
      debug: true,
    }
  }
  // __TEST__
  return { ...prodEnv, ...ENV.test }
}

const currentEnv = createEnv({
  // env,
})

// 默认会有个 api 配置，之后会读取 store
export default currentEnv
