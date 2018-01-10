import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

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
  mode: 'hash',
  base: '',
  scrollBehavior: () => ({ y: 0 }),
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
// const loginPath = '/login'
router.beforeEach((to, from, next) => {
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

  if (title) {
    document.title = title
  }
  if (desc) {
    // ...
  }

  // hack: 在微信等webview中无法修改document.title的情况
  // let $iframe = $('<iframe src="/isLive.action" style="display:none;"></iframe>');
  // $iframe.on('load',function() {
  //   setTimeout(function() {
  //     $iframe.off('load').remove();
  //   }, 0);
  // }).appendTo($body);

  // 确保一定要调用 next()
  next()
})

export default router
