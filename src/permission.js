import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permissiom judge function
// function hasPermission(roles, permissionRoles) {
//   // admin permission passed directly
//   if (roles.indexOf('admin') >= 0) return true
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// no redirect whitelist
const whiteList = ['/login', '/authredirect'];

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  const { logged = false } = store.state.user;
  if (logged) {
    // determine if there has token
    // has token
    if (to.path === '/login') {
      next({ path: '/' });
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done();
      // } else if (store.getters.roles.length === 0) {
      // } else if (store.getters.addRouters.length === 0) {
    } else if (!router.options.isAddDynamicRouters) {
      // 判断当前用户是否已拉取完user_info信息
      // 拉取user_info
      store
        .dispatch('GetUserInfo')
        .then(res => {
          // note: roles must be a array! such as: ['editor','develop']
          const { roles } = res.data;
          // 根据roles权限生成可访问的路由表
          // GenerateRoutes or GenerateLocalRoutes
          // 使用api控制路由
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 使用本地控制路由
            // store.dispatch('GenerateLocalRoutes', { roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters);
            router.options.isAddDynamicRouters = true;
            // hack方法 确保addRoutes已完成
            // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true });
          });
        })
        .catch((err = {}) => {
          store.dispatch('FedLogout').then(() => {
            Message.error(
              err.errmsg || 'Verification failed, please login again'
            );
            next({ path: '/' });
          });
        });
      // } else if (hasPermission(store.getters.roles, to.meta.roles)) {
      //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      //   next()
    } else {
      next();
      // next({
      //   path: '/401',
      //   replace: true,
      //   query: { noGoBack: true },
      // })
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // has no token
    // 在免登录白名单，直接进入
    next();
  } else {
    // 否则全部重定向到登录页
    next('/login');
    // if current page is login will not trigger afterEach hook, so manually handle it
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
