import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import Element from 'element-ui';
import 'mint-ui/lib/style.css';
import 'element-ui/lib/theme-chalk/index.css';

import '@/style/index'; // global css

import { sync } from 'vuex-router-sync';

import '@/registerServiceWorker';

// 外部样式在前面引入，我们的样式在App.vue 中后引入
// import './style/index.styl';
// import '@/utils/rem';
// import './utils/filters';
// import './plugins/directive';
import '@/icons';

// import env from '@/config/env';
import mini from '@/utils/mini';
// import { loadJs } from '@/utils/dLoad';

import i18n from '@/lang'; // Internationalization
import { isAuth } from '@/utils';
import '@/icons'; // icon
import '@/errorLog'; // error log
import '@/permission'; // permission control
import '@/mock'; // simulation data

import * as filters from '@/utils/filters'; // global filters

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

// import Page from '@/layout/Page';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
// import '@/config/js-report';
import vueLazyload from 'vue-lazyload';

import imgError from '@/assets/img/error.svg';
console.warn('[main.js]');
// 全局组件
// Vue.component(Page.name, Page);

Vue.use(vueLazyload, {
  lazyComponent: true,
  preLoad: 1.3, // 预加载高度比例
  error: imgError, // 图片路径错误时加载图片
  // loading: imgLoading, // 预加载图片
  attempt: 1, // 尝试加载图片数量
});

Vue.config.productionTip = false;

// 挂载全局
Vue.prototype.isAuth = isAuth;

Object.keys(mini).forEach(key => {
  /* eslint no-multi-assign: 0 */
  Vue.prototype[`$${key}`] = mini[key];
});

sync(store, router); // 同步路由数据到 store内;

// 环境变量
console.log(process.env.VUE_APP_VERSION);
console.log(process.env);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
