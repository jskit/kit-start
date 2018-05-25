import Vue from 'vue'
import Router from 'vue-router'
import device from '@/utils/device'
import env from '@/config/env'
import api from '@/config/api'
import mini from '@/utils/mini'
import tongji from '@/utils/tongji'
// import store from '../store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'  // Progress 进度条样式

const defaultPage = 'index'

Vue.use(Router)

let routes = []
// 路由去中心化
// https://webpack.js.org/guides/dependency-management/#require-context
// 目前export default .js导出引用不友好，部分场景需特殊处理
// 子路由推荐使用数组格式(支持多模板)
const reqModules = require.context('../views', true, /^\.(\/([\s\S])+)?\/route\.js$/)
// console.log(reqModules.keys())
reqModules.keys().map((key) => {
  const route = reqModules(key).default || reqModules(key)
  routes = routes.concat(route)
  return route
})
// console.log(routes)

const router = new Router({
  debug: __DEV__ ? env.debug : false,
  mode: env.routerMode,
  base: env.base,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    ...routes,
    // 处理特殊路由
    {
      path: '*',
      redirect: '/',
      // redirect: {
      //   name: 'index',
      // },
    },
  ],
})

const loginRouteName = 'login'
// const whiteList = ['/login']
// const loginPath = '/login'
const limitPages = {
  alipay: ['/ali_portal'],
  master: ['/', `/${defaultPage}`],
}
router.beforeEach((to, from, next) => {
  // NProgress.start()
  const {
    meta = {},
  } = to
  const {
    needAuth = false,
    title = '',
    desc = '',
  } = meta

  // 解决拦截 router-link 跳转问题
  if (meta.status === -1) {
    return next(false)
  }

  // const { logged = false } = store.state
  const logged = false

  if (needAuth && logged && to.path !== loginRouteName) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return next({
      name: loginRouteName,
      query: { redirect: to.fullPath },
    })
  }

  // 路由拦截
  // 如果是支付宝，则拦截受限制页面
  // 如果不是支付宝，则拦截支付宝页面
  const blockAliPages = !device.alipay && limitPages.alipay.indexOf(to.path) > -1
  const blockNotAliPages = device.alipay && limitPages.master.indexOf(to.path) > -1
  if (blockAliPages || blockNotAliPages) {
    return next({
      path: device.alipay ? `/ali_portal` : '/',
      query: { ...to.query },
      replace: true,
    })
  }

  if (title) {
    document.title = title
  }
  if (desc) {
    // ...
  }

  // hack: 在微信等webview中无法修改 document.title 的情况
  // let $iframe = $('<iframe src="/isLive.action" style="display:none;"></iframe>');
  // $iframe.on('load',function() {
  //   setTimeout(function() {
  //     $iframe.off('load').remove();
  //   }, 0);
  // }).appendTo($body);
  console.log('before Router')

  console.log('update channel')
  const { query = {} } = to
  if (query.channel_id) {
    env.channel = query.channel_id
    api.setCommonParams({
      channel: query.channel_id,
    })
  }

  console.log('tongji')
  const currentPath = to.path.replace(/^\//, '') || defaultPage
  tongji.pv(currentPath)

  mini.setPageName(currentPath)

  // 确保一定要调用 next()
  next()
})

// 路由守卫
router.beforeResolve((to, from, next) => {
  console.log('before Resolve')
  next()
})
// router.afterEach(hook) 添加一个全局的后置钩子函数,该函数会在每次路由切换成功进入激活阶段时被调用。

router.afterEach((to, from) => {
  console.log('after Router')
  // NProgress.done()
})

if (device.alipay) {
  document.addEventListener('back', (e) => {
    /* eslint no-alert: 0 */
    // alert(window.history.length)
    // window.alert('111' + window.location.href)
    // var urlReg = /[\?\&]backUrl\=[\w\%\.\_]*/;
    // var url = window.location.href.match(urlReg);
    // // 限定只有入口url可以使用backUrl修改返回地址，否则从提单页进入详情分享后会出问题
    // if (url && url[0]) {
    //   url = decodeURIComponent(decodeURIComponent(decodeURIComponent(url[0].split('=')[1])));
    //   // alert(url)
    //   if (url == 'exit') {
    //     // window.alert('exit')
    //     ('AlipayJSBridge' in window) && AlipayJSBridge.call('exitApp');
    //   } else {
    //     // window.alert('222' + window.location.href)
    //     window.location.href = '#' + url;
    //   }
    //   e.preventDefault();
    // }
  }, false);
}

export default router
