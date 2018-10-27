import device from '@/utils/device';
import env from '@/config/env';
console.warn('[bridge.js]');
// import alipay from './alipay'
// import wechat from './wechat'
// import alipay from './alipay'
// import env from '@/config/env'
// import { getAppId } from '@/config'
// import api from '@/api'
const noop = () => {};
const fnList = ['setShare', 'showShare', 'showOptionMenu', 'hideOptionMenu'];
const bridge = {};

fnList.forEach(key => {
  bridge[key] = noop;
});

switch (device.host.name) {
  case 'alipay':
    Object.assign(bridge, require('./alipay'));
    if (env.isEnv(['prod', 'beta'])) {
      bridge.hideOptionMenu();
    }
    console.log('alipay bridge', bridge);
    break;
  case 'wechat':
    Object.assign(bridge, require('@/utils/bridge/wechat').default);
    console.log('wechat bridge', bridge);
    break;
  case 'msf': {
    require('@/utils/bridge/WebViewJavascriptBridge');
    const Bridge = require('@/utils/bridge/bridge').default;
    Object.assign(bridge, Bridge, window.WebViewJavascriptBridge);
    console.log('app bridge', bridge);
    break;
  }
  default:
  // do nothing...
}

export default bridge;
