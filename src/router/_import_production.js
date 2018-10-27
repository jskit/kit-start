module.exports = file => () =>
  import(/* webpackChunkName: "x-[index]" */ '@/views/' + file + '.vue');
