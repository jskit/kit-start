

function lazyLoad(page) {
  return () => import(/* webpackChunkName: "default" */ `./${page}`)
}

export default {
  // 使用默认子路由，则父路由的 name 就得去掉
  // 否则使用 `:to="{name: 'demo'"` 会导致默认子路由不会render
  path: '/',
  component: lazyLoad('_tpl'),
  children: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页',
      },
      component: lazyLoad('index'),
    },
  ],
}
