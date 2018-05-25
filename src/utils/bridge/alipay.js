import device from '@/utils/device'
import env from '@/config/env'
import mini from '@/utils/mini'

// https://myjsapi.alipay.com/jsapi/h5app-lifecycle.html
// alipays://platformapi/startapp?appId=20000067&url=http%3A%2F%2Fm.taobao.com
const { location } = window
let isBridgeReady = false
const fnListCaches = []
const isFunction = fn => typeof fn === 'function'

console.log('load alipay jsbridge')

function runReadyFn(jb) {
  for (let i = 0, len = fnListCaches.length; i < len; i++) {
    fnListCaches[i](jb)
  }
}

function jsBridgeReady() {
  isBridgeReady = true
  // 如果 jsbridge 已经注入则直接调用
  console.info('alipay jsbridge ready');
  if (env.debug && !env.isEnv('prod')) {
    mini.showToast('alipay jsbridge ready')
  }
  runReadyFn(window.AlipayJSBridge);
}

if (device.alipay) {
  if (window.AlipayJSBridge) {
    jsBridgeReady && jsBridgeReady();
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', jsBridgeReady, false);
  }
}

const bridge = {
  ready(callback) {
    if (!device.alipay || !isFunction(callback)) return;

    if (!isBridgeReady) {
      fnListCaches.push(callback);
    } else {
      callback && callback(window.AlipayJSBridge);
    }
  },

  setTitle(title) {
    bridge.ready((AlipayJSBridge) => {
      AlipayJSBridge.call('setTitle', {
        title,
      });
    });
  },

  hideOptionMenu() {
    bridge.ready((AlipayJSBridge) => {
      AlipayJSBridge.call('hideOptionMenu');
    });
  },

  // https://myjsapi.alipay.com/jsapi/native/start-share.html
  setShare(opts = {}) {
    // TODO: 设置分享信息
    bridge.ready((AlipayJSBridge) => {
      document.addEventListener('optionMenu', (e) => {
        // 点击了标题栏右边按钮
      }, false);
    })
  },

  // 发起分享
  showShare(opts = {}) {
    const {
      title = '',
      content = '',
      imageUrl = '',
      url = location.href,
    } = opts
    bridge.ready((AlipayJSBridge) => {
      AlipayJSBridge.call('startShare', {
        // 当用户选择该数组内指定的分享渠道时，仅返回渠道名，而不是真正开始自动分享
        onlySelectChannel: [
          'Weibo',
          'ALPContact',
          'ALPTimeLine',
          'SMS',
          'Weixin',
          'WeixinTimeLine',
          'QQ',
          'QQZone',
          'DingTalkSession',
          'OpenInSafari',
          'Favorite',
        ],
      }, (data) => {
        console.log('当前用户点击的分享渠道名为：' + data.channelName);
        // 通过onlySelectChannel屏蔽掉自动分享功能后，自行调用shareToChannel接口进行单独分享
        AlipayJSBridge.call('shareToChannel', {
          name: data.channelName,
          param: {
            // 选填，目前支持支持 'auto',text','image','url' 格式
            // android 分享组件不支持auto
            contentType: 'url',
            title,
            content,
            iconUrl: imageUrl,
            imageUrl,
            captureScreen: !imageUrl, // 是否分享当前页面的截图
            url,
            // 特定分享渠道的扩展参数
            otherParams: {
              bizType: 'COMMON_CONFIG', // 吱口令独有参数
              btn2: '去看看', // 吱口令独有参数
              btn2A: url, // 吱口令独有参数
              shareTitle: '吱口令',
              preContent: opts.content + '，这个内容太棒啦，赶紧长按复制，打开支付宝查看',
              endContent: '',
            },
          },
        }, (result) => {
          console.log(result)
        });
      });
    })
  },
}

export default bridge
