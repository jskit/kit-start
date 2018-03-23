// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill"
// 低版本不支持 Promise [caniuse](http://caniuse.com/#feat=promises)
// require('es6-promise').polyfill()
import Vue from 'vue'
import './utils/rem'
import 'mint-ui/lib/style.css'
import './style/index.styl'
import App from './App'
import router from './router'
import vueLazyload from 'vue-lazyload'
import configLazyload from '@/config/lazyload'
import * as filters from '@/utils/filters'
import mini from '@/utils/mini'
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

// Vue.use(Loadmore)
// Vue.use(InfiniteScroll)

Object.keys(mini).forEach((key) => {
  /* eslint no-multi-assign: 0 */
  Vue[`${key}`] = Vue.prototype[`${key}`] = mini[key]
})

// 全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#root',
  render: h => h(App),

  // template: '<App/>',
  // components: { App }
})

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
