// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyload from 'vue-lazyload'
import configLazyload from './config/lazyload'
import './utils/rem'

Vue.use(vueLazyload, {
  ...configLazyload,
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: (h) => h(App),

  // template: '<App/>',
  // components: { App }
})
