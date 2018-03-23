import {
  Toast,
  Indicator,
  MessageBox,
} from 'mint-ui'
import qs from 'qs'
import router from '../router'
import urlMap, { getUrlType } from './urlMap'
import { stringify } from './stringUtil'
import env from '@/config/env'

const { location } = window
// console.log(router)

// 为简单起见，路由不要嵌套或过于复杂了，方便做映射
const { routes = [] } = router.options

console.log(routes)
// const pages = {}

function compact(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'undefined') delete obj[key]
  }
  return obj
}


/* eslint no-multi-assign: 0 */
// Vue.$showToast = Vue.prototype.$showToast = Toast
// Vue.$showLoading = Vue.prototype.$showLoading = Indicator
// Vue.$showModal = Vue.prototype.$showModal = MessageBox

const currentPage = router.match(location)
console.log(currentPage)

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
const httpReg = /^https?/i
function nativeJump(obj = {}, replace) {
  let url = obj.page
  if (!url) return
  if (!httpReg.test(url)) {
    const urlObj = completeUrl(obj.page, obj.query)
    let { origin, pathname } = location
    pathname = '/index.html'
    if (__DEV__ && env.name === 'local') {
      origin = env.host
      pathname = '/t.html'
    }
    url = `${origin}${pathname}#${urlObj.pageUrl}`
  }
  console.log(url)
  // debugger
  if (!replace) {
    location.href = url
    return
  }
  location.replace(url)
}

function completeUrl(url = '', params = '') {
  let query = { ...params }
  const urlArr = url.split('?')
  const pageName = urlArr[0]
  if (!pageName) return
  query = !urlArr[1] ? stringify(query) : [stringify(query), urlArr[1]].join('&')
  query = query ? `?${query}` : ''
  return {
    pageName,
    query,
    pagePath: `${pageName}`,
    pageUrl: `${pageName}${query}`,
  }
}

export default {
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
  $goLink(e) {
    e.preventDefault()
    if (!e) {
      console.log('此方法限用于 data-link 链接跳转')
    } else {
      const { link } = e.currentTarget.dataset
      this.forward(link)
    }
  },

  forward(url, query = {}) {
    // url = 'http://10.0.255.231:8000/t.html?channel_id=huabei&d_host=alipay&topic_code=74152227bc6c29ac14ce772abab6aeda&zt_active=20180201_ea0207&spm=huabei/hbcjy227&ref=profile%3Fchannel_id%3Dh5#ali_zt'
    if (!url) {
      console.log(`无需跳转 ${url}`)
      return
    }
    const { replace, back } = query
    /* eslint no-param-reassign: 0 */
    delete query.replace
    delete query.back
    if (back) {
      location.back()
      return
    }
    const pageType = getUrlType(url)
    let map = ''
    switch (pageType) {
      case 'schema': {
        // 打开 schemaUrl
        map = urlMap(url, 'h5')
        if (map.page === 'index') return
        nativeJump(map, replace)
        break
      }
      case 'h5':
        map = urlMap(url)
        // if (map.page !== 'index') return
        nativeJump({
          page: url,
        }, replace)
        break
      case 'target': {
        const type = !replace ? 'push' : 'replace'
        const nextPage = router.match(url)
        if (nextPage.path) {
          console.log(nextPage)
          // debugger
          router[type]({
            path: nextPage.path,
            query: nextPage.query,
          })
        } else {
          // 跳转不存在的新版时，转为H5链接
          map = urlMap(url, 'h5')
          nativeJump({
            page: `${map.page}?${qs.stringify(map.query)}`,
          }, replace)
        }
        break
      }
      default: {
        map = urlMap(url)
        console.log(map)
        // goPage(map.page, map.query)
        // do nothing
      }
    }
  },
}
