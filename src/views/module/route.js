
function lazyLoad(page) {
  return () => import(/* webpackChunkName: "module" */ `./${page}`)
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

export default {
  // 使用默认子路由，则父路由的 name 就得去掉
  // 否则使用 `:to="{name: 'demo'"` 会导致默认子路由不会render
  path: '/module',
  component: lazyLoad('_tpl'),
  children: [
    {
      path: '/',
      alias: '/index',
      name: 'demo',
      meta: {
        title: '模块页面',
      },
      component: Index,
    },
  ],
}
