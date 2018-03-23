
/* eslint no-var: 0 no-underscore-dangle: 0 */
var _hmt = _hmt || [];
(function baidu() {
  window._hmt = window._hmt || _hmt
  const hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?97185224affb9782323dfcb8c919d612'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
  if (window.location.origin !== 'https://devnode.cn') {
    _hmt.push(['_setAutoPageview', false])
  }
}())

export default {
  googleAnalyticsId: 'UA-XXXXX-X',
  baiduAnalyticsId: 'UA-XXXXX-X',
}

// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// ga('create', 'UA-yourID', 'auto')
// ga('send', 'pageview') // 是否要统计着陆页面访问，取决于你的需求，这个不一定需要，会和`router`统计有重复

// main.js 里，如果你使用了 vue-router
// router.afterEach(function (to) {
//   if (window.ga) {
//     window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
//     window.ga('send', 'pageview')
//   }
// })
