

function lazyLoad(page) {
  return () => import(/* webpackChunkName: "default" */ `./${page}`)
}

// 分组级是否要去中心化（暂不需要，方便自定义设定）
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
