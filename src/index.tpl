<!DOCTYPE html>
<html lang="en" style="font-size: 100px;">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title> </title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="icon" type="image/png" sizes="32x32" href="<%= htmlWebpackPlugin.files.publicPath %>static/img/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="<%= htmlWebpackPlugin.files.publicPath %>static/img/icons/favicon-16x16.png">
<!--[if IE]><link rel="shortcut icon" href="/static/img/icons/favicon.ico"><![endif]-->
<!-- Add to home screen for Android and modern mobile browsers -->
<!-- <link rel="manifest" href="<%= htmlWebpackPlugin.files.publicPath %>static/manifest.json"> -->
<link rel="manifest" href="/v2/static/manifest.json">
<meta name="theme-color" content="#4DBA87">

<!-- Add to home screen for Safari on iOS -->
<meta name="format-detection" content="telephone=no, email=no" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="kit-start">
<link rel="apple-touch-startup-image" href="<%= htmlWebpackPlugin.files.publicPath %>static/img/startup.jpg" />
<link rel="apple-touch-icon" href="<%= htmlWebpackPlugin.files.publicPath %>static/img/icons/apple-touch-icon-152x152.png">
<link rel="mask-icon" href="<%= htmlWebpackPlugin.files.publicPath %>static/img/icons/safari-pinned-tab.svg" color="#4DBA87">
<!-- Add to home screen for Windows -->
<meta name="msapplication-TileImage" content="<%= htmlWebpackPlugin.files.publicPath %>static/img/icons/msapplication-icon-144x144.png">
<meta name="msapplication-TileColor" content="#ffffff">

<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
<%= htmlWebpackPlugin.files.webpackManifest %>
</head>
<body>
<noscript>
  This is your fallback content in case JavaScript fails to load.
</noscript>
<div id="root">
  <!-- shell -->
</div>
<!-- Todo: only include in production -->
<%= htmlWebpackPlugin.options.serviceWorkerLoader %>
<!-- built files will be auto injected -->
<script>
!function(){
  var d = document;
  var s = d.querySelector('script'); // || d.querySelector('head');
  function loadJS(scriptUrl) {
    var s1 = document.createElement('script');
    s1.async = true;
    s1.defer = true;
    s1.src = scriptUrl;
    s.parentNode.insertBefore(s1, s);
  }

  // baidu
  window._hmt = window._hmt || [];
  _hmt.push(['_setAutoPageview', false]);
  loadJS('https://hm.baidu.com/hm.js?498ed47e9a8bacaea9f8ec61836110b7');

  // pwiki
  window._paq = window._paq || [];
  _paq.push(["setCookieDomain", "*.haoshiqi.net"]);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', 'https://tongji.haoshiqi.net/piwik.php']);
  _paq.push(['setSiteId', '1']);
  loadJS('https://img1.haoshiqi.net/piwik.js');

  // cnzz
  window._czc = window._czc || [];
  _czc.push(["_setAutoPageview", false]);
  loadJS('https://s13.cnzz.com/z_stat.php?id=1263211505');
}();
</script>
</body>
</html>
