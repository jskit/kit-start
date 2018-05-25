
/* eslint no-var: 0 no-underscore-dangle: 0 */

!function(){
  var d = document;
  var s = d.getElementsByTagName('script')[0];

  // 百度
  window._hmt = window._hmt || [];
  _hmt.push(['_setAutoPageview', false]);
  const s1 = document.createElement('script');
  s1.async = true;
  s1.defer = true;
  s1.src = 'https://hm.baidu.com/hm.js?498ed47e9a8bacaea9f8ec61836110b7';
  s.parentNode.insertBefore(s1, s);

  // piwik 统计代码
  // https://developer.piwik.org/guides/tracking-javascript-guide
  window._paq = window._paq || [];
  _paq.push(["setCookieDomain", "*.haoshiqi.net"]);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', 'https://tongji.haoshiqi.net/piwik.php']);
  _paq.push(['setSiteId', '1']);
  const s2 = document.createElement('script');
  s2.src = 'https://img1.haoshiqi.net/piwik.js';
  s.parentNode.insertBefore(s2, s);
}();

// export default {
//   // googleAnalyticsId: 'UA-XXXXX-X',
//   baiduAnalyticsId: 'UA-XXXXX-X',
// }

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
