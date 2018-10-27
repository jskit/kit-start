import Vue from 'vue';
import env from '@/config/env';

// fundebug.notify("Test", "Hello, Fundebug!");
const caches = {};
let jsReport = () => {};

const filters = [
  {
    // name: /^ReferenceError$/,
    message: /WeixinJSBridge is not defined/,
  },
  {
    // name: /^ReferenceError$/,
    message: /window\.local_obj/,
  },
];

// js-tracking
// 错误收集，线上和beta环境
if (env.isMode('prod') && !env.console && env.isEnv(['prod', 'beta'])) {
  // 个人版 3000错误事件/月 数据保存7天
  const jsTracking = require('fundebug-javascript');
  jsTracking.apikey =
    '2a6da749751f004cf0d63f9c93049a498131b519b29fbc8beeaefa6580afb3ca';
  jsTracking.releasestage = env.stage;
  jsTracking.appversion = env.version;
  jsTracking.filters = filters;
  // jsTracking.sampleRate = 0.3;
  console.log(jsTracking);
  jsReport = debugString => {
    if (!caches[debugString]) {
      caches[debugString] = true;
      console.log('js-error:', debugString);
      jsTracking.notify('js-error:', debugString);
    }
  };
  /* eslint no-inner-declarations: 0 */
  function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';
    /* eslint no-underscore-dangle: 0 */
    const name = vm._isVue
      ? (vm.$options && vm.$options.name) ||
        (vm.$options && vm.$options._componentTag)
      : vm.name;
    return (
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file
        ? ' at ' + (vm.$options && vm.$options.__file)
        : '')
    );
  }

  Vue.config.errorHandler = (err, vm, info) => {
    const componentName = formatComponentName(vm);
    const propsData = vm.$options && vm.$options.propsData;

    jsTracking.notifyError(err, {
      metaData: {
        componentName,
        propsData,
        info,
      },
    });
  };
} else {
  /* eslint no-alert: 0 */
  const log = env.isEnv('local') ? alert : console.error;
  jsReport = debugString => {
    if (!caches[debugString]) {
      caches[debugString] = true;
      return log(`js-report: ${debugString}`);
    }
  };
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    const string = msg.toLowerCase();
    const substring = 'script error';
    if (string.indexOf(substring) > -1) {
      log('Script Error: See Browser Console for Detail');
    } else {
      const message = [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error),
      ].join(' - ');

      log(message);
    }
    return false;
  };
}

export default jsReport;
