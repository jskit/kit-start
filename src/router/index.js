import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

Vue.use(Router)

// 路由去中心化设计
// 处理 export default 不好，特殊处理
const routes = (r => {
  console.log(r.keys())
  return r.keys().map(key => r(key).default)
})(require.context('../views', true, /^\.(\/([\s\S])+)?\/route\.js$/))

// 处理特殊路由
routes.push({
  path: '*',
  redirect: '/',
  // redirect: {
  //   name: 'index',
  // },
})
console.log(routes)

const router = new Router({
  mode: 'hash',
  base: '',
  scrollBehavior: () => ({ y: 0 }),
  routes,
})

// const loginRouteName = 'login'
const loginPath = '/login'
router.beforeEach((to, from, next) => {
  const {
    meta = {},
  } = to
  const {
    needAuth = false,
    title = '',
    desc = '',
  } = meta

  // const { logged = false } = store.state
  const logged = false

  if (needAuth && loggedIn && to.path !== loginRouteName) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return next({
      // name: loginRouteName,
      path: loginPath,
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
