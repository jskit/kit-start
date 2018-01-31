
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
