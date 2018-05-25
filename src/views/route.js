// import device from '@/utils/device'

import env from '@/config/env'

function lazyLoad(page) {
  return () => import(/* webpackChunkName: "default" */ `./${page}`)
}
function lazyLoadAlipay(page) {
  return () => import(/* webpackChunkName: "alipay" */ `./alipay/${page}`)
}

const routes = [
  {
    path: '',
    name: 'index',
    alias: '/index',
    meta: {
      title: '好食期',
    },
    component: lazyLoad('index'),
  },
]

const aliRoutes = [
  {
    path: 'ali_portal',
    meta: {
      title: (env.channel === 'huabei' ? '花呗-' : '') + '特惠食品',
    },
    component: lazyLoadAlipay('index'),
  },
]

// 分组级是否要去中心化（暂不需要，方便自定义设定）
export default [{
  // 使用默认子路由，则父路由的 name 就得去掉
  // 否则使用 `:to="{name: 'demo'"` 会导致默认子路由不会render
  path: '/',
  component: lazyLoad('_tpl'),
  children: [
    ...aliRoutes,
    ...routes,
    // {
    //   path: '/city',
    //   name: 'city',
    //   meta: {
    //     title: '选择收货省份',
    //   },
    //   component: lazyLoad('city'),
    // },
    // {
    //   path: '/demo',
    //   name: '/demo',
    //   // alias: 'demo',
    //   meta: {
    //     title: 'Demo',
    //   },
    //   component: lazyLoad('demo'),
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   meta: {
    //     title: '个人中心',
    //   },
    //   component: lazyLoad('profile'),
    // },
  ],
}]
