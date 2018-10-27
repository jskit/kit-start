import {
  asyncRouterMap,
  constantRouterMap,
  // fnDynamicMenuRoutes,
} from '@/router';
import { isURL } from '@/utils/validate';
import api from '@/api';
// import {
//   // treeDataTranslate,
// } from '@/utils';
import {
  // storage,
  session,
} from '@/utils/storage';

// 主入口路由(需嵌套上左右整体布局)
// const mainRoutes = {

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，
 * roles 服务端返回roles角色，前端根据meta配置的roles返回符合用户角色权限的路由表
 * auths 服务端返回menu菜单，前端根据菜单的url配置，返回对应的路由表
 *       菜单可以好多级，路由暂时只有两级，默认都是layout模板
 * @param asyncRouterMap
 * @param filter 过滤方式
 */
function filterAsyncRouter(asyncRouterMap2, roles) {
  const accessedRouters = asyncRouterMap2.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

function fnDynamicMenu(menuList = [], menusMap = {}, prePath = '/') {
  const reg = new RegExp(`^${prePath}/`, 'i');
  const menus = [];
  for (let i = 0; i < menuList.length; i++) {
    const item = menuList[i];
    const hasChildren = item.children && item.children.length;
    const routePath = (item.link || '').replace(/^\//, '');
    if (!routePath) {
      console.warn(`menu item.link must be input value:`, item);
      continue;
    }
    if (menusMap[routePath]) {
      console.warn(`menus '${routePath}' is repeat`);
    }
    menusMap[routePath] = true;
    // 生成的菜单，还是不要 `sys/account` 格式，直接使用 `account`，过滤掉前缀
    // 这样和路由的设定相匹配
    const menu = {
      path: prePath !== '/' ? routePath.replace(reg, '') : routePath,
      name: routePath.replace('/', '-'),
      visible: item.visible,
      meta: {
        title: item.name,
        icon: item.icon,
        iframeUrl: '',
      },
    };
    if (hasChildren) {
      const dynamicData = fnDynamicMenu(item.children, menusMap, routePath);
      menu.children = dynamicData.menus;
    }
    if (routePath && /\S/.test(routePath)) {
      if (isURL(routePath)) {
        menu['url'] = `i-${item.menuId}`;
        menu['name'] = `i-${item.menuId}`;
        menu['meta']['iframeUrl'] = routePath;
      }
      if (menu.visible) {
        menus.push(menu);
      }
    }
  }
  // if (prePath) {
  //   session.set('dynamicMenu', menus, 86400);
  // }
  return { menus, menusMap };
}

// 通过菜单配置link来过滤路由表
//
// TODO: 404 未做好
// TODO: 还未支持iframe打开远程连接
function filterAsyncRouter2(asyncRouterMap2, menus, basePath = '') {
  const accessedRouters = asyncRouterMap2.filter(route => {
    let path = route.path.replace(/^\//, '');
    path = basePath ? [basePath, path].join('/') : path;
    // 如果路径匹配或为顶级路由时（二级路由暂未判断），都返回true
    if (menus[path] || path.indexOf('/') === -1) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter2(route.children, menus, path);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    isAddDynamicRouters: false,
    menus: constantRouterMap,
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // 动态添加的路由
      console.log('动态添加的路由', routers);
      state.addRouters = routers;
      // 当前的全部路由
      state.isAddDynamicRouters = true;
      state.routers = constantRouterMap.concat(routers);
    },
    SET_MENUS: (state, menus) => {
      // 当前的全部路由
      state.menus = constantRouterMap.concat(menus);
    },
  },
  actions: {
    // 生成对应的路由表，结构同 asyncRouterMap
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        // const { roles } = data
        api.getMenu(
          {},
          res => {
            // 菜单直接展示即可，路由则根据菜单数据进行过滤
            // 为了方便过滤，菜单处理成map，同时，路由遍历每项添加全路径，用来匹配菜单路径
            const { menuList, permissionList } = res.data;
            const { menus, menusMap } = fnDynamicMenu(menuList);
            // const menuListMap = getMenuListMap(menuList);
            const accessedRouters = filterAsyncRouter2(
              asyncRouterMap,
              menusMap
            );
            // const { menuList = [], permissionList = [] } = res.data;
            session.set('menuList', menuList, 86400);
            session.set('permissionList', permissionList, 86400);
            // const dynamicMenu = fnDynamicMenu(menuList);
            console.log(menus);
            commit('SET_MENUS', menus);
            // commit('SET_ROUTERS', dynamicMenuRoutes)
            commit('SET_ROUTERS', accessedRouters);
            resolve();
          },
          err => {
            reject(err);
          }
        );
      });
    },
    GenerateLocalRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        // 过滤支持两种，一种按照角色（meta.roles）一种按照权限菜单
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        }
        commit('SET_MENUS', accessedRouters);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
  },
};

export default permission;
