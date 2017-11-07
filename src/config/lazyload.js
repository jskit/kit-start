// import imgError from '@/assets/img/error.png'
// svg 使用 import 会被svg-sprite-loader加载器处理
// import imgLoading from '@/assets/img/loading-spin.svg'

export default {
  lazyComponent: true,
  preLoad: 1.3,
  // error: imgError,
  loading: 'static/img/loading-spin.svg',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  // listenEvents: [ 'scroll' ],
  // filter: {
  //   progressive (listener, options) {
  //       const isCDN = /qiniudn.com/
  //       if (isCDN.test(listener.src)) {
  //           listener.el.setAttribute('lazy-progressive', 'true')
  //           listener.loading = listener.src + '?imageView2/1/w/10/h/10'
  //       }
  //   },
  //   webp (listener, options) {
  //       if (!options.supportWebp) return
  //       const isCDN = /qiniudn.com/
  //       if (isCDN.test(listener.src)) {
  //           listener.src += '?imageView2/2/format/webp'
  //       }
  //   },
  // },
  // adapter: {
  //   loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
  //       // do something here
  //       // example for call LoadedHandler
  //       LoadedHandler(el)
  //   },
  //   loading (listender, Init) {
  //       console.log('loading')
  //   },
  //   error (listender, Init) {
  //       // 错误统计
  //       console.log('error')
  //   },
  // },
}
