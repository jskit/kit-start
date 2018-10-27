import Vue from 'vue';
import Router from 'vue-router';
import env from '@/config/env';
import { isURL } from '@/utils/validate';
import {
  // storage,
  session,
} from '@/utils/storage';

const _import = require('./_import_' + process.env.NODE_ENV);
// 使用下面的方法，编译速度很慢
// function _import(page) {
//   if (env.isMode('prod')) {
//     return () => import(/* webpackChunkName: "x-[index]" */ `@/views/${page}`);
//   }
//   return () => require(`@/views/${page}.vue`).default;
//   // return () =>
//   //   import(/* webpackChunkName: "[request]-[index]" */ `@/views/${page}`);
// }

// in development-env not use lazy-loading,
// because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout';

const layouts = {
  layout: Layout,
  // sys: Layout,
  // org: Layout,
  // project: Layout,
  page: null,
};
function getLayout(key = '') {
  return layouts[key] || null;
}

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 * */

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
* */
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true,
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: _import('errorPage/401'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true },
      },
    ],
  },
];

export default new Router({
  mode: env.routerMode,
  base: env.routerBase,
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

// 通过路径配置过滤来动态加载路由
// 动态路由在store中接口控制
export const asyncRouterMap = [
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'system1',
    },
    children: [
      {
        path: 'account',
        component: _import('modules/sys/account'),
        name: 'account',
        meta: {
          title: '管理员列表',
          icon: 'admin',
        },
      },
      {
        path: 'role',
        component: _import('modules/sys/role'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'role',
        },
      },
      {
        path: 'menu',
        component: _import('modules/sys/menu'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          icon: 'menu',
        },
      },
      {
        path: 'sql',
        component: _import('modules/sys/sql'),
        name: 'sql',
        meta: {
          title: 'SQL监控',
          icon: 'sql',
        },
      },
      {
        path: 'job',
        component: _import('modules/sys/job'),
        name: 'job',
        meta: {
          title: '定时任务',
          icon: 'task',
        },
      },
      {
        path: 'dict',
        component: _import('modules/sys/dict'),
        name: 'dict',
        meta: {
          title: '数据字典',
          icon: 'dict',
        },
      },
      {
        path: 'log',
        component: _import('modules/sys/log'),
        name: 'log',
        meta: {
          title: '系统日志',
          icon: 'log',
        },
      },
      // {
      //   path: 'base',
      //   component: _import('doing/doing'),
      //   name: 'base',
      //   meta: {
      //     title: 'system',
      //     icon: 'setting',
      //   },
      // },
    ],
  },
  {
    path: '/oss',
    component: Layout,
    redirect: 'noredirect',
    name: 'oss',
    meta: {
      title: '文件管理',
      icon: 'storage',
    },
    children: [
      {
        path: 'upload',
        component: _import('modules/oss/oss'),
        name: 'upload',
        meta: {
          title: '文件上传',
          icon: 'upload',
        },
      },
    ],
  },
  {
    path: '/org',
    component: Layout,
    redirect: 'noredirect',
    name: 'org',
    meta: {
      title: '组织架构',
      icon: 'org1',
    },
    children: [
      {
        path: 'dept',
        component: _import('modules/org/dept'),
        name: 'dept',
        meta: {
          title: '部门管理',
          icon: 'depart',
        },
      },
      {
        path: 'personnel',
        component: _import('modules/org/personnel'),
        name: 'personnel',
        meta: {
          title: '员工管理',
          icon: 'personnel',
        },
      },
      {
        path: 'post',
        component: _import('modules/org/post'),
        name: 'post',
        meta: {
          title: '岗位管理',
          icon: 'post',
        },
      },
      // 资源管理
      {
        path: 'res-cert',
        component: _import('modules/org/res-cert'),
        name: 'res-cert',
        meta: {
          title: '证书管理',
          icon: 'cert3',
        },
      },
    ],
  },

  {
    path: '/project',
    component: Layout,
    redirect: 'noredirect',
    name: 'project',
    meta: {
      title: 'project',
      icon: 'project',
    },
    children: [
      {
        path: 'proj',
        component: _import('modules/project/proj'),
        name: 'proj',
        meta: {
          title: '项目管理',
          icon: 'gc1',
        },
      },
      {
        path: 'detail',
        component: _import('modules/project/detail'),
        name: 'proj_detail',
        meta: {
          title: '详情',
          icon: 'gc1',
        },
      },
      // {
      //   path: 'tracking',
      //   component: _import('modules/project/tracking'),
      //   name: 'tracking',
      //   meta: {
      //     title: '项目跟踪',
      //     icon: 'gc1',
      //   },
      // },
      {
        path: 'task',
        component: _import('modules/project/task'),
        name: 'task',
        meta: {
          title: '任务管理',
          icon: 'tasks',
        },
      },
    ],
  },

  { path: '*', redirect: '/404', hidden: true },
];

/**
 * 添加动态(菜单)路由
 * 路由的树结构和菜单的树结构要分离，然后进行映射动态添加
 * @param {*} menuList 菜单列表
 */
// 生成菜单来展示菜单数据
// 菜单有三级没关系，通过path对应到路由，路由目前两级，只跟布局模板有关系
export function fnDynamicMenuRoutes(menuList = [], prePath = '/') {
  const routes = [];
  for (let i = 0; i < menuList.length; i++) {
    const item = menuList[i];
    const hasChildren = item.children && item.children.length;
    item.link = item.link.replace(/^\//, '');

    const route = {
      // path: item.link,
      path: item.link,
      component: null,
      redirect: hasChildren ? 'noredirect' : undefined,
      name: item.link.replace('/', '-'),
      meta: {
        isDynamic: true,
        menuId: item.id,
        title: item.name,
        icon: item.icon,
        iframeUrl: '',
        // isTab: true,
      },
    };
    if (hasChildren) {
      route.children = fnDynamicMenuRoutes(item.children, item.link);
      // routes = routes.concat(item.children);
      // 非空白
    }
    if (item.link && /\S/.test(item.link)) {
      // } else {
      // url 以 http[s]:// 开头, 通过iframe展示
      if (isURL(item.link)) {
        route['path'] = `i-${item.menuId}`;
        route['name'] = `i-${item.menuId}`;
        route['meta']['iframeUrl'] = item.link;
      } else {
        try {
          const componentPath = item.link.replace(/^\//, '');
          route['component'] =
            prePath === '/'
              ? getLayout(componentPath)
              : _import(`modules/${componentPath}`) || null;
        } catch (e) {
          // nothing...
        }
      }
      routes.push(route);
    }
  }
  // if (routes.length >= 1) {
  //   fnDynamicMenuRoutes(routes, routes)
  // }
  if (prePath === '/') {
    // routes.push({
    //   path: '*',
    //   redirect: '/404',
    //   hidden: true,
    // });
    session.set('dynamicRoutes', routes, 86400);
  }
  return routes;
}

// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table/complex-table',
//   name: 'example',
//   meta: {
//     title: 'example',
//     icon: 'example',
//   },
//   children: [
//     {
//       path: '/example/table',
//       component: _import('example/table/index'),
//       redirect: '/example/table/complex-table',
//       name: 'Table',
//       meta: {
//         title: 'Table',
//         icon: 'table',
//       },
//       children: [
//         {
//           path: 'dynamic-table',
//           component: _import('example/table/dynamicTable/index'),
//           name: 'dynamicTable',
//           meta: { title: 'dynamicTable' },
//         },
//         {
//           path: 'drag-table',
//           component: _import('example/table/dragTable'),
//           name: 'dragTable',
//           meta: { title: 'dragTable' },
//         },
//         {
//           path: 'inline-edit-table',
//           component: _import('example/table/inlineEditTable'),
//           name: 'inlineEditTable',
//           meta: { title: 'inlineEditTable' },
//         },
//         {
//           path: 'tree-table',
//           component: _import('example/table/treeTable/treeTable'),
//           name: 'treeTableDemo',
//           meta: { title: 'treeTable' },
//         },
//         {
//           path: 'custom-tree-table',
//           component: _import('example/table/treeTable/customTreeTable'),
//           name: 'customTreeTableDemo',
//           meta: { title: 'customTreeTable' },
//         },
//         {
//           path: 'complex-table',
//           component: _import('example/table/complexTable'),
//           name: 'complexTable',
//           meta: { title: 'complexTable' },
//         },
//       ],
//     },
//     {
//       path: 'tab/index',
//       icon: 'tab',
//       component: _import('example/tab/index'),
//       name: 'tab',
//       meta: { title: 'tab' },
//     },
//   ],
// },

// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: {
//     title: 'Example',
//     icon: 'example',
//   },
//   children: [
//     {
//       path: 'table',
//       name: 'Table',
//       component: () => import('@/views/table/index'),
//       meta: { title: 'Table', icon: 'table' },
//     },
//     {
//       path: 'tree',
//       name: 'Tree',
//       component: () => import('@/views/example/tree'),
//       meta: { title: 'Tree', icon: 'tree' },
//     },
//   ],
// },
// {
//   path: '/form',
//   component: Layout,
//   redirect: 'noredirect',
//   name: 'form',
//   meta: {
//     title: 'form',
//     icon: 'form',
//   },
//   children: [
//     {
//       path: 'create-form',
//       component: _import('form/create'),
//       name: 'createForm',
//       meta: {
//         title: 'createForm',
//         icon: 'table',
//       },
//     },
//     {
//       path: 'edit-form',
//       component: _import('form/edit'),
//       name: 'editForm',
//       meta: {
//         title: 'editForm',
//         icon: 'table',
//       },
//     },
//   ],
// },

// {
//   path: '/error',
//   component: Layout,
//   redirect: 'noredirect',
//   name: 'errorPages',
//   meta: {
//     title: 'errorPages',
//     icon: '404',
//   },
//   children: [
//     {
//       path: '401',
//       component: _import('errorPage/401'),
//       name: 'page401',
//       meta: {
//         title: 'page401',
//         noCache: true,
//       },
//     },
//     {
//       path: '404',
//       component: _import('errorPage/404'),
//       name: 'page404',
//       meta: {
//         title: 'page404',
//         noCache: true,
//       },
//     },
//   ],
// },
// {
//   path: '/tools',
//   component: Layout,
//   redirect: '/tools/link',
//   name: 'tools',
//   meta: {
//     title: 'tools',
//     icon: 'example',
//   },
//   children: [
//     {
//       path: 'link',
//       name: 'Link',
//       component: () => import('@/views/tools/link'),
//       meta: {
//         title: 'link',
//         icon: 'form',
//       },
//     },
//     // {
//     //   path: 'link',
//     //   name: 'Link',
//     //   component: () => import('@/views/tools/link'),
//     //   meta: { title: '链接生成工具', icon: 'form' },
//     // },
//   ],
// },
