// ENV

const apiEnv = 'beta'

export const ENV = {
  prod: {
    host: 'm.haoshiqi.net',
    baseUrl: 'https://m.haoshiqi.net',
    apiBaseUrl: 'https://m.api.haoshiqi.net',
  },
  dev: {
    baseUrl: 'http://m.dev.haoshiqi.net',
    apiBaseUrl: 'http://m.devapi.haoshiqi.net',
  },
  beta: {
    baseUrl: 'https://m.beta.haoshiqi.net',
    apiBaseUrl: 'https://m.betaapi.haoshiqi.net',
  },
  test: {
    baseUrl: 'https://127.0.0.1',
    apiBaseUrl: 'https://m.betaapi.haoshiqi.net',
  },
}

const baseEnv = {
  port: 8001,
  debug: false,
  routerMode: 'history',
  googleAnalyticsId: 'UA-XXXXX-X',
  baiduAnalyticsId: 'UA-XXXXX-X',
  publicPath: '',
  baseUrl: '',
  apiBaseUrl: '',
}

const regDev = /^(m\.dev\.haoshiqi\.net)/i
const regBeta = /^(m\.beta\.haoshiqi\.net)/i
const regProd = /^(m\.haoshiqi\.net)/i
const regLocal = /^(localhost|10\.|127\.|192\.)/i

export function createEnv(opts = {}) {
  const { env = 'prod' } = opts
  const { host = ENV[env].host, origin = ENV[env].baseUrl } = window.location
  const prodEnv = Object.assign({}, baseEnv, ENV.prod)
  if (host.match(regProd)) {
    return prodEnv
  }
  if (host.match(regDev)) {
    return Object.assign(prodEnv, ENV.dev, ENV[env])
  }
  if (host.match(regBeta)) {
    return Object.assign(prodEnv, ENV.beta, ENV[env])
  }
  if (host.match(regLocal)) {
    return Object.assign(prodEnv, {
      baseUrl: `${origin}/#`,
      apiBaseUrl: `${origin}`,
      routerMode: 'hash',
      debug: true,
    }, opts)
  }
  // __TEST__
  return Object.assign(prodEnv, ENV.test)
}

// 默认会有个 api 配置，之后会读取 store
export default createEnv({
  env: apiEnv,
})
