
function lazyLoad(page) {
  return () => import(/* webpackChunkName: "zt" */ `./${page}`)
}

const Index = lazyLoad('index')
const isComming = {
  template: `
    <div>isComming</div>
  `,
}
// const viewTpl = {
//   template: `
//     <router-view></router-view>
//   `,
// }

export default [{
  // 使用默认子路由，则父路由的 name 就得去掉
  // 否则使用 `:to="{name: 'demo'"` 会导致默认子路由不会render
  path: '/zt',
  component: lazyLoad('_tpl'),
  children: [
    // 为了统计更精准，是否不应该使用子路由的 '/'，使用 redirect
    //  { path: '/a', redirect: '/b' }
    //  { path: '/a', redirect: { name: 'foo' }}
    {
      path: '/',
      alias: '/index',
      name: 'zt/index',
      meta: {
        title: '专题页面',
      },
      component: Index,
    },
    {
      path: '*',
      meta: {
        title: 'isComming',
      },
      component: isComming,
    },
  ],
}]
