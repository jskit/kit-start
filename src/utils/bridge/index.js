
import device from '@/utils/device'
import env from '@/config/env'

// import alipay from './alipay'
// import wechat from './wechat'
// import alipay from './alipay'
// import env from '@/config/env'
// import { getAppId } from '@/config'
// import api from '@/config/api'
const noop = () => {}
const fnList = [
  'setShare',
  'showShare',
  'showOptionMenu',
  'hideOptionMenu',
]
const bridge = {
}

fnList.forEach((key) => {
  bridge[key] = noop
})

switch (device.host.name) {
  case 'alipay':
    Object.assign(bridge, require('./alipay'))
    if (env.isEnv(['prod', 'beta'])) {
      bridge.hideOptionMenu()
    }
    break;
  case 'wechat':
    Object.assign(bridge, require('./wechat'))
    break;
  // case 'hybrid':
  //   Object.assign(bridge, require('./hybrid'))
  //   break;
  default:
  // do nothing...
}

export default bridge
