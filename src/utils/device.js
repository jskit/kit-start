
// 此处判断 UA，最好全部统一处理为小写字母后再判断

const device = {}
const ua = navigator.userAgent

const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)

device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false

// const getEls = function (el) {
//   return document.querySelectorAll(el)
// }
const getEl = function (el) {
  return document.querySelector(el)
}

// Android
if (android) {
  device.os = 'android'
  device.osVersion = android[2]
  device.android = true
  device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0
}
if (ipad || iphone || ipod) {
  device.os = 'ios'
  device.ios = true
}
// iOS
if (iphone && !ipod) {
  device.osVersion = iphone[2].replace(/_/g, '.')
  device.iphone = true
}
if (ipad) {
  device.osVersion = ipad[2].replace(/_/g, '.')
  device.ipad = true
}
if (ipod) {
  device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  device.iphone = true
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
  if (device.osVersion.split('.')[0] === '10') {
    device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0]
  }
}

// Webview
device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i)

// Minimal UI
var domMeta = getEl('meta[name="viewport"]')
if (device.os && device.os === 'ios') {
  var osVersionArr = device.osVersion.split('.')
  device.minimalUi = !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      domMeta && domMeta.content.indexOf('minimal-ui') >= 0
}

// Check for status bar and fullscreen app mode
/* global screen */
var windowWidth = window.innerWidth // $(window).width()
var windowHeight = window.innerHeight
device.statusBar = false
if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
  device.statusBar = true
} else {
  device.statusBar = false
}

// Classes
var classNames = []

// Pixel Ratio
device.pixelRatio = window.devicePixelRatio || 1
classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio))
if (device.pixelRatio >= 2) {
  classNames.push('retina')
}

// OS classes
if (device.os) {
  classNames.push(device.os,
                  device.os + '-' + device.osVersion.split('.')[0],
                  device.os + '-' + device.osVersion.replace(/\./g, '-'))
  if (device.os === 'ios') {
    var major = parseInt(device.osVersion.split('.')[0], 10)
    for (var i = major - 1; i >= 6; i--) {
      classNames.push('ios-gt-' + i)
    }
  }
}
var domHtml = getEl('html')
// Status bar classes
if (device.statusBar) {
  classNames.push('with-statusbar-overlay')
} else {
  domHtml.classList.remove('with-statusbar-overlay')
}

// Add html classes
if (classNames.length > 0) {
  for (var j = classNames.length - 1; j > -1; j--) {
    domHtml.classList.add(classNames[j])
  }
}

// keng..
device.isWeixin = /MicroMessenger/i.test(ua)
device.isQQ = ua.indexOf('qq\/') > -1

// 自定义
const iqgUA = ua.match(/\sdwd_iqg\/([\d\.]+)/)
if (iqgUA) {
  device.isIqg = true
  device.iqg = {
    version: iqgUA[1],
  }
}
const hsqUA = ua.match(/\sdwd_hsq\/([\d\.]+)/)
if (hsqUA) {
  device.isHsq = true
  device.hsq = {
    version: hsqUA[1],
  }
}

device.isAndroid = device.android
device.isiPhone = device.iphone

export default device
