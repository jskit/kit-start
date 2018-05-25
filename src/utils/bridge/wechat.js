
// 微信 JSSDK
import device from '@/utils/device'
import env from '@/config/env'
import api from '@/config/api'
import mini from '@/utils/mini'
import { getAppId } from '@/config'
import { loadJs } from '@/utils/dLoad'
// 要用远程url，太小就被 base64 了
// import logo from '~assert/img/logo-large.png'

const { location } = window
let isConfigReady = false
const fnListCaches = []
const isFunction = fn => typeof fn === 'function'

console.log('load wechat jsbridge')

function runReadyFn() {
  console.log('runReadyFn')
  for (let i = 0, len = fnListCaches.length; i < len; i++) {
    fnListCaches[i](window.wx)
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
  */

const apiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
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
  if (isConfigReady || !device.wechat) return
  const { wx } = window
  console.log('wx.config start')
  wx.config({
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
    console.info('ok: wechat ready')
    runReadyFn();

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

  wx.error((res) => {
    isConfigReady = false;
    console.info('error: wechat ready')
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

    // var loadUrl = location.href.split('#')[0],
    // $.ajax({
    //   type: 'GET',
    //   url: './api.php',
    //   data: {
    //     url: loadUrl,
    //   },
    //   timeout: 3000,
    //   dataType: 'json',
    //   contentType: 'application/json',
    //   success: function(res, status){
    //     res.debug = !!debug;
    //     jssdkConfig(res);
    //   },
    //   error: function(xhr, type){
    //     console.log('jssdkConfig Ajax error!')
    //   },
    //   complete: function(){
    //
    //   }
    // });
  },
  config() {
    return isConfigReady;
  },
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
  },
  setShare(opts = {}) {
    console.log('setShare')
    const shareData = {
      title: opts.title || '专注食品特卖平台，品牌食品2折起~',
      desc: opts.desc || '特惠食品',
      link: opts.link || location.href,
      imgUrl: opts.imgUrl || 'https://img1.haoshiqi.net/logo-large.png',
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
    }
    wechat.ready((wx) => {
      console.info('ready', wx)
      wx.onMenuShareAppMessage(shareData); // 分享给朋友
      wx.onMenuShareTimeline(shareData); // 分享到朋友圈
      wx.onMenuShareQQ(shareData); // 分享到QQ
      wx.onMenuShareWeibo(shareData); // 分享到微博
    })
  },
};

// 针对单页面应用，只需注册 loadUrl
const loadUrl = location.href.split('#')[0];

function jssdkInit() {
  console.info('wechat jssdk init')
  if (!wechat.config()) {
    wechat.init((callback) => {
      const mpWechatAppId = getAppId();
      // alert('注册的是'+loadUrl);
      api.getWxSign({
        appid: mpWechatAppId,
        url: loadUrl,
      }, (res) => {
        console.log('wechat getSign ok')
        callback({
          ...res.data,
          debug: env.debug,
        })
      }, (err) => {
        console.log('wechat getSign err')
        // do nothing
      })
    })
  }
}

function jsBridgeReady(msg) {
  /* eslint no-alert: 0 */
  // alert(msg || 'ready')
  console.info('wechat jsbridge ready')
  console.info('window.WeixinJSBridge && window.wx')
  console.log(JSON.stringify(window.WeixinJSBridge))
  console.log(JSON.stringify(window.wx))

  if (env.debug && !env.isEnv('prod')) {
    mini.showToast('wechat jsbridge ready')
  }

  // jssdk 中会使用 WeixinJSBridge 变量，所以放在ready之后加载最保险
  const wxJSSDKUrl = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  loadJs(wxJSSDKUrl, {
    async: true,
    onload() {
      console.log('wechat jssdk loaded')
      console.log(window.wx)
      jssdkInit();
    },
  })
}

if (device.wechat) {
  // 微信JSSDK 经常报错
  // https://blog.fundebug.com/2017/02/18/weixinjsbridge-is-not-defined/
  // https://github.com/whq731/mobile-problems/blob/master/%E7%9B%91%E5%90%ACwxbridge%E5%8A%A0%E8%BD%BD%E5%90%8E%E5%86%8D%E5%94%A4%E8%B5%B7%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.md
  // Uncaught ReferenceError: WeixinJSBridge is not defined
  // 实际是浏览器加载weixinJSBridge需要一点延迟时间
  // 改为监听ready事件之后再进行下一步操作
  // WeixinJSBridge 这个为微信环境的变量，但wx是jssdk的变量
  if (typeof window.WeixinJSBridge === 'undefined') {
    jsBridgeReady('window.WeixinJSBridge');
  } else {
    document.addEventListener('WeixinJSBridgeReady', jsBridgeReady, false);
  }
}

export default wechat
