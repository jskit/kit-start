import {
  Toast,
  Indicator,
  MessageBox,
} from 'mint-ui'
// import qs from 'qs'
// import router from '../router'
// import urlMap, { getUrlType, getParams } from './urlMap'
// import env from '@/config/env'
import tongji from '@/utils/tongji'
// import { urlfix } from '@/utils/stringUtil'
// import device from '@/utils/device'

// const { location, history } = window
// console.log(router)

// 为简单起见，路由不要嵌套或过于复杂了，方便做映射
// 遍历 routes，拿到 pages 映射
// TIP: 暂不要 alias，每个路由必须配置name
// const pages = {}
// const { routes = [] } = router.options
// routes.forEach((item) => {
//   if (item.children) {
//     item.children.forEach((cItem) => {
//       pages[cItem.name] = `${item.path}${cItem.path}`
//     })
//   } else {
//     pages[item.name] = `${item.path}`
//   }
// })
// console.log(routes)


function compact(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'undefined') delete obj[key]
  }
  return obj
}

let currentPageName = 'index'
// const currentPage = router.match(location)
// console.log(currentPage)

// const nextPage = router.match('/zt')

// console.log(nextPage)

// const pages = {}
// function getRoutesMap(arr) {
//   arr.forEach((item, index) => {

//     const path = item.path.split('/').reverse()[0]
//     if (path) {
//       pages[path] = item.path
//     }

//   })
// }
// function getH5Url(pageUrl) {
//   let { origin, pathname } = location
//   pathname = '/index.html'
//   if (__DEV__ && env.isEnv('local')) {
//     ({ origin } = env);
//     pathname = '/t.html'
//   }
//   pageUrl = urlfix(pageUrl, qs.stringify(getChannel()))
//   return `${origin}${pathname}#${pageUrl}`
// }

// const httpReg = /^https?/i
// function nativeJump(obj = {}, replace) {
//   let url = obj.page
//   if (!url) return
//   if (!httpReg.test(url)) {
//     const urlObj = completeUrl(obj.page, obj.query)
//     url = getH5Url(urlObj.pageUrl)
//   }
//   console.log(url)
//   // debugger
//   if (!replace) {
//     location.href = url
//     return
//   }
//   location.replace(url)
// }

// function getChannel(url = '', targetUrl = url) {
//   // 透传参数
//   // 如果targetUrl已存在参数，则不透传
//   const query = getParams(url) || {}
//   const targetQuery = getParams(targetUrl, '') || {}
//   const paramsObj = {}
//   const params = [
//     'd_host',
//     'channel_id',
//     'spm',
//     'share',
//   ]
//   for (let i = 0; i < params.length; i++) {
//     const key = params[i]
//     if (query[key] && query[key] !== targetQuery[key]) {
//       paramsObj[key] = query[key]
//     }
//   }
//   return paramsObj
// }

// function completeUrl(url = '', params = {}) {
//   const urlArr = url.split('?')
//   const pageName = urlArr[0]
//   if (!pageName) return
//   let query = Object.assign({}, qs.parse(urlArr[1]), params)
//   query = qs.stringify(query)
//   query = query ? `?${query}` : ''
//   return {
//     pageName,
//     query,
//     pagePath: `${pageName}`,
//     pageUrl: `${pageName}${query}`,
//   }
// }

const mini = {
  log: tongji.event,
  showToast: Toast,
  showLoading: (opts = {}) => {
    let op = {}
    if (typeof opts === 'string') {
      op = {
        content: opts,
      }
    }
    // type = fading-circle snake triple-bounce double-bounce
    op = Object.assign({
      text: op.content || '',
      spinnerType: opts.type || 'fading-circle',
    })

    Indicator.open(compact(op))
  },
  hideLoading: (times = 0) => {
    setTimeout(() => Indicator.close(), times)
  },
  showAlert: MessageBox.alert,
  showConfirm: MessageBox.confirm,


  // $ 开头混入
  getPageName(url) {
    return currentPageName
  },
  setPageName(name) {
    currentPageName = name
  },
  // goLink(e) {
  //   e.preventDefault()
  //   if (!e) {
  //     console.log('此方法限用于 data-link 链接跳转')
  //   } else {
  //     const { link, log } = e.currentTarget.dataset
  //     if (log) {
  //       // example:
  //       // [CLog event]: portal_banner|index:1 portal_banner banner {"index":"1"}
  //       // const pageName = mini.getPageName();
  //       // mini.log(log);
  //       // mini.log(pageName, '123123', 'xxx');
  //       // return;
  //     }
  //     mini.forward(link)
  //   }
  // },

  // goH5Url(pageName = '') {
  //   if (!pageName) return
  //   location.href = getH5Url(pageName)
  // },

  // back(bool) {
  //   if (history.length <= 2 && bool) {
  //     mini.forward('index')
  //     return
  //   }
  //   history.back()
  // },

  // forward(url, query = {}) {
  //   // url = 'http://10.0.255.231:8000/t.html?channel_id=huabei&d_host=alipay&topic_code=74152227bc6c29ac14ce772abab6aeda&zt_active=20180201_ea0207&spm=huabei/hbcjy227&ref=profile%3Fchannel_id%3Dh5#ali_zt'
  //   // url = 'haoshiqi://com.doweidu/couplesbuydetail?pinActivityId=10390'
  //   if (!url) {
  //     console.log(`无需跳转 ${url}`)
  //     return
  //   }
  //   console.log('跳转 url:', url)
  //   const { replace, back } = query
  //   /* eslint no-param-reassign: 0 */
  //   delete query.replace
  //   delete query.back
  //   if (back) {
  //     location.back()
  //     return
  //   }
  //   const pageType = getUrlType(url)
  //   let map = ''
  //   url = urlfix(url, qs.stringify(getChannel(url)))
  //   switch (pageType) {
  //     case 'schema': {
  //       // 打开 schemaUrl
  //       map = urlMap(url, 'h5')
  //       if (!map.page) return
  //       if (map.page === 'index') return
  //       nativeJump(map, replace)
  //       break
  //     }
  //     case 'h5':
  //       map = urlMap(url)
  //       // if (map.page !== 'index') return
  //       if (!map.page) return
  //       nativeJump({
  //         page: url,
  //       }, replace)
  //       break
  //     case 'target': {
  //       const type = !replace ? 'push' : 'replace'
  //       const nextPage = router.match(url)
  //       // const newPages = ['/', '/index', '/ali_portal']
  //       if (nextPage.path !== '/') {
  //         router[type]({
  //           path: nextPage.path,
  //           query: nextPage.query,
  //         }, (res) => {
  //           console.log(res)
  //         }, (err) => {
  //           console.log(err)
  //         })
  //       } else {
  //         // 跳转不存在的新版时，转为H5链接
  //         const jumpUrl = urlfix(url, qs.stringify(query))
  //         map = urlMap(jumpUrl, 'h5')
  //         if (!map.page) return
  //         nativeJump({
  //           page: `${map.page}?__from=v2&${qs.stringify(map.query)}`,
  //         }, replace)
  //       }
  //       break
  //     }
  //     default: {
  //       map = urlMap(url)
  //       console.log(map)
  //       // goPage(map.page, map.query)
  //       // do nothing
  //     }
  //   }
  // },
}

// debugger
// if (device.alipay) {
//   // 这里不行
//   // console.log(1111111)
//   // // location.replace(getH5Url('ali_portal'))
//   // mini.forward('alipay', {
//   //   replace: true,
//   // })
// }

export default mini
