// 微信 JSSDK
import device from '@/utils/device';
import env from '@/config/env';
import api from '@/api';
// 存在 mini 循环引用
// import mini from '@/utils/mini';
import { wxappId } from '@/config';
import { loadJs } from '@/utils/dLoad';
// 要用远程url，太小就被 base64 了
// import logo from '~assert/img/logo-large.png'
console.log(api);
// console.log(mini);
const { location } = window;
let isConfigReady = false;

const fnListCaches = [];
const isFunction = fn => typeof fn === 'function';

console.log('load wechat jsbridge');

function runReadyFn() {
  console.log('runReadyFn');
  for (let i = 0, len = fnListCaches.length; i < len; i++) {
    fnListCaches[i](window.wx);
  }
}

/*
  * 注意：
  * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
  * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
  * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
  *
  * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
  * 邮箱地址：weixin-open@qq.com
  * 邮件主题：【微信JS-SDK反馈】具体问题
  * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
  * http://demo.open.weixin.qq.com/jssdk
  * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
  */

const apiList = [
  // 分享 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
  'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  'updateTimelineShareData', // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  'onMenuShareTimeline', // 即将废弃
  'onMenuShareAppMessage', // 即将废弃
  'onMenuShareQQ', // 即将废弃
  'onMenuShareWeibo',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'translateVoice',
  'startRecord',
  'stopRecord',
  'onRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard',
];

function jssdkConfig(data) {
  // 关于html5-History模式在微信浏览器内的问题 https://github.com/vuejs/vue-router/issues/481
  console.log('enter wx.config');
  if (isConfigReady || !device.wechat) return;
  const { wx } = window;
  console.log('wx.config start');
  wx.config({
    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    debug: data.debug || false,
    appId: data.appId,
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
      'checkJsApi',
      ...apiList,
    ],
  });

  wx.ready(() => {
    isConfigReady = true;
    console.info('ok: wechat ready');
    // 隐藏菜单
    wx.hideMenuItems({
      // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      menuList: [
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:share:QZone',
        'menuItem:share:email',
      ],
    });
    runReadyFn();
    // 验证api
    // wx.checkJsApi({
    //   jsApiList: [
    //     ...apiList,
    //   ],
    //   success: function xx(res) {
    //     console.log('checkJsApi:ok', res);
    //   },
    //   fail: function xx(err) {
    //     console.log('checkJsApi:fail', err);
    //   },
    // });
  });

  wx.error(res => {
    isConfigReady = false;
    console.info('error: wechat ready');
    // runReadyFn();
  });
}

const wechat = {
  init(initFn) {
    // 如果不是微信，不操作
    if (!device.wechat) {
      console.info('非微信环境，无视 wx JSSDK');
      return false;
    }

    if (isConfigReady) return;

    if (isFunction(initFn)) {
      // 这里传入 ajax 函数，配置 jssdk
      initFn(jssdkConfig);
    }
    // jssdkConfig 后直接调用一次 runReadyFn
  },
  config() {
    return isConfigReady;
  },
  jsBridgeReady: jsBridgeReady,
  ready(callback) {
    if (!device.wechat || !isFunction(callback)) return;

    // 微信自带ready方法，也有事件队列
    if (!isConfigReady) {
      fnListCaches.push(callback);
    } else {
      callback && callback(window.wx);
    }
  },
  showShare(data = {}) {
    console.warn('你需要制作引导分享页面');
  },
  setShare(opts = {}) {
    console.warn('[setShare]', opts);
    // alert(JSON.stringify(opts));
    const { defaultShareInfo = {} } = env;
    const shareData = {
      ...env.defaultShareInfo,
      title: opts.title || defaultShareInfo.title,
      desc: opts.desc || defaultShareInfo.desc,
      link: opts.link || defaultShareInfo.link,
      imgUrl: opts.imgUrl || defaultShareInfo.imgUrl,
      trigger(res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        // alert('用户点击发送给朋友');
        opts.trigger && opts.trigger(res);
      },
      success(res) {
        // TODO 此处貌似有个服务器端请求，需要告知服务器端分享了
        if (opts.success) {
          opts.success(res);
        } else {
          // 全局设定分享成功回调
          // self.trackEvent('share', self.pageName);
        }
      },
      cancel(res) {
        // alert('已取消');
        opts.cancel && opts.cancel(res);
      },
      fail(res) {
        // alert(JSON.stringify(res));
        opts.fail && opts.fail(res);
      },
    };
    wechat.ready(wx => {
      console.info('ready', wx);
      // alert('ready');
      console.warn(shareData);
      // 即将被废弃
      wx.onMenuShareAppMessage(shareData); // 分享给朋友
      wx.onMenuShareTimeline(shareData); // 分享到朋友圈
      wx.onMenuShareQQ(shareData); // 分享到QQ

      // !! ios 新版本微信需要调用新的api
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
      wx.updateAppMessageShareData(shareData);
      // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
      wx.updateTimelineShareData(shareData);

      wx.onMenuShareWeibo(shareData); // 分享到微博
    });
  },
};

// 针对单页面应用，只需注册 loadUrl
/**
 * !!注意:
 * ios 用第一次进入页面后的 window.location.href.split('#')[0] 请求一次 js_ticket，config 一次，并在每一页设置分享信息。
 * android 因为对pushState的支持不好，
 *  所以需要路由改变后，用新的 URL 请求 请求 js_ticket，config 并 设置分享信息
 * 提醒:
 * iOS : 如果在 beforeEnter 等钩子里面做了等待登录后才能进入等 逻辑，需要使用 进入页面前的初始 URL 作为请求 js_ticket 的 URL。
 * Android || iOS : 如果是在 router 的 afterEach 里做的设置分享信息的逻辑，必须要用一个异步操作来做，因为这时候你的 URL 还没有变成当前页面的 URL。
 */

function jssdkInit() {
  console.info('wechat jssdk init');
  // if (!wechat.config()) {
  console.log('isWxLoad', isWxLoad);
  // alert(isWxLoad);
  if (isWxLoad) {
    isConfigReady = false;
    wechat.init(callback => {
      const loadUrl = location.href.split('#')[0];
      console.warn('[注册的是]' + loadUrl);

      // var mini = require('@/utils/mini').default;
      // mini.showToast('注册的是:' + loadUrl);
      api.getWxSign(
        {
          appid: wxappId,
          url: loadUrl,
        },
        res => {
          console.log('wechat getSign ok');
          callback({
            ...res.data,
            debug: env.debug,
          });
        },
        err => {
          // isConfigReady = false;
          console.log('wechat getSign err');
          // do nothing
        }
      );
    });
  }
}

let isWxLoad = false;
function jsBridgeReady(msg) {
  console.log('__wxjs_environment:', window.__wxjs_environment);
  /**
   * 微信网页内  __wxjs_environment == 'browser'
   * 微信小程序 web-view 内网页 __wxjs_environment == 'miniprogram'
   */
  if (!device.wechat) {
    return;
  }

  /* eslint no-alert: 0 */
  // alert(msg || 'ready')
  console.info('wechat jsbridge ready');
  console.info('window.WeixinJSBridge && window.wx');
  console.log(JSON.stringify(window.WeixinJSBridge));
  console.log(JSON.stringify(window.wx));

  if (env.debug && !env.isEnv('prod')) {
    // console.log(mini);
    // mini.showToast('wechat jsbridge ready');
  }
  //
  if (!isWxLoad) {
    // jssdk 中会使用 WeixinJSBridge 变量，所以放在ready之后加载最保险
    const wxJSSDKUrl = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';
    loadJs(wxJSSDKUrl, {
      async: true,
      onload() {
        console.log('wechat jssdk loaded');
        console.log(window.wx);
        isWxLoad = true;
        jssdkInit();
      },
    });
  } else {
    jssdkInit();
  }
}

// 微信JSSDK 经常报错
// https://blog.fundebug.com/2017/02/18/weixinjsbridge-is-not-defined/
// https://github.com/whq731/mobile-problems/blob/master/%E7%9B%91%E5%90%ACwxbridge%E5%8A%A0%E8%BD%BD%E5%90%8E%E5%86%8D%E5%94%A4%E8%B5%B7%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.md
// Uncaught ReferenceError: WeixinJSBridge is not defined
// 实际是浏览器加载weixinJSBridge需要一点延迟时间
// 改为监听ready事件之后再进行下一步操作
// WeixinJSBridge 这个为微信环境的变量，但wx是jssdk的变量

// if (window.WeixinJSBridge || window.WeixinJSBridge.invoke) {
if (device.iphone) {
  if (typeof window.WeixinJSBridge === 'undefined') {
    jsBridgeReady('window.WeixinJSBridge');
  } else {
    document.addEventListener('WeixinJSBridgeReady', jsBridgeReady, false);
  }
}

export default wechat;
