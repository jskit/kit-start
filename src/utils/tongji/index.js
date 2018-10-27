// import device from '@/utils/device';
import env from '@/config/env';

import piwik from './piwik';
import baidu from './baidu';
// import cnzz from './cnzz';

// 集合后统一调用
const plugins = {
  piwik,
  baidu,
  // cnzz,
};

// const commonMethods = [
//   'init',
//   'update',
//   'pv',
//   'cv',
//   'event',
//   'custom',
//   'report',
// ];

function originCall(methodName, ...rest) {
  for (const key in plugins) {
    const plugin = plugins[key];
    if (plugin[methodName]) {
      plugin[methodName](...rest);
    }
  }
}

export default {
  init(config = {}) {
    // document.body.addEventListener('click', e => {}, true);
    originCall('init', config);
  },
  update(data = {}) {
    originCall('update', data);
  },
  pv(page) {
    if (!page) return;
    page = page === '/' ? 'index' : page;
    if (!env.isEnv('prod')) {
      console.log('[log pv]:', page);
      return;
    }
    originCall('pv', page);
  },
  cv(...rest) {
    if (!env.isEnv('prod')) {
      console.log('[log cv]:', ...rest);
      return;
    }
    originCall('cv', ...rest);
    // const logged = cookie.getToken() ? 'logged_yes' : 'logged_no';

    // tongji.cv(1, 'page', page, 3);
    // tongji.cv(2, 'logged', logged, 2);
    // tongji.cv(3, 'host', device.host.name, 3);
    // tongji.cv(4, 'platform', device.system, 3);
  },
  event(...rest) {
    if (!env.isEnv('prod')) {
      console.log('[log event]:', ...rest);
      return;
    }
    originCall('event', ...rest);
  },
  custom(opts = {}) {
    if (!env.isEnv('prod')) {
      console.log('[log custom:]', opts);
      return;
    }
    originCall('custom', opts);
  },
  report(bool) {
    if (!env.isEnv('prod')) return;
    originCall('report', bool);
  },

  // js 错误信息: error, sUrl, sLine, sChar
  jsError(...rest) {
    //
  },
};
