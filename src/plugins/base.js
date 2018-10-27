/**
 * 添加扩展基础 实例方法
 * 全局方法等
 */
export default {
  install(Vue, options) {
    // 全局方法或属性 Vue 方法
    console.log('install plugin ...');
    Vue.$showLoading = function showLoading() {
      console.log('base plugin ....showLoading');
    };
    // 添加指令
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // 逻辑...
    //   }
    //   ...
    // })
    // 注入组件
    // Vue.mixin({
    //   created: function () {
    //     // 逻辑...
    //   }
    //   ...
    // })
    // 添加组件
    // Vue.component('RouterView', View)
    /**
     * 实例方法
     */
    Vue.prototype.$showLoading = function showLoading() {
      console.log('base plugin ....showLoading');
    };
    //.....
  },
};
