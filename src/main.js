// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill"
// 低版本不支持 Promise [caniuse](http://caniuse.com/#feat=promises)
// Android 4.4 不支持 promise
require('es6-promise').polyfill()
// require('offline-plugin/runtime').install();
// import * as FastClick from 'fastclick';
// FastClick['attach'](document.body);

import 'mint-ui/lib/style.css'
// import '@/utils/rem'
import '@/utils/bridge'

import Vue from 'vue'
import env from '@/config/env'
import '@/config/js-report'
// import jsReport from '@/config/js-report'
import mini from '@/utils/mini'
import { loadJs } from '@/utils/dLoad'

// 外部样式在前面引入，我们的样式在App.vue 中后引入
// import './style/index.styl'
import App from './App'
import router from './router'
import store from './store'
import vueLazyload from 'vue-lazyload'
import configLazyload from '@/config/lazyload'
import * as filters from '@/utils/filters'
// import {
//   // Loadmore,
//   // InfiniteScroll,
// } from 'mint-ui'

document.addEventListener('DOMContentLoaded', () => {
  if (window.FastClick) window.FastClick.attach(document.body)
}, false)

Vue.use(vueLazyload, {
  ...configLazyload,
})

Object.keys(mini).forEach((key) => {
  /* eslint no-multi-assign: 0 */
  Vue[`$${key}`] = Vue.prototype[`$${key}`] = mini[key]
})

// 全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

function initVue(time = 0) {
  // 把初始化渲染放到 setTimeout 里，延迟vue初始化，兼顾骨架屏
  setTimeout(() => {
    console.info('init Vue')
    /* eslint-disable no-new */
    new Vue({
      store,
      router,
      el: '#root',
      render: h => h(App),

      // template: '<App/>',
      // components: { App }
    })
  }, time)
}

if (!env.console) {
  initVue()
} else {
  const vConsole = 'https://unpkg.com/kit-debug@latest'
  loadJs(vConsole, {
    // async: true,
    // defer: true,
    first: true,
    onload() {
      /* eslint no-undef: 0 */
      if (typeof VConsole !== 'undefined') {
        window.vConsole = new VConsole();
      }
      console.info('vConsole loaded');

      initVue()
    },
  })
}

// let indexScrollTop = 0
// router.beforeEach((route, redirect, next) => {
//   if (route.path !== '/') {
//     indexScrollTop = document.body.scrollTop
//   }
//   document.title = route.meta.title || document.title
//   next()
// })

// router.afterEach((route) => {
//   if (route.path !== '/') {
//     document.body.scrollTop = 0
//   } else {
//     Vue.nextTick(() => {
//       document.body.scrollTop = indexScrollTop
//     })
//   }
// })
