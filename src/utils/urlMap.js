
// import urlParse from './url-parse/index'
import qs from 'qs'
import { camelCase } from './index'
import jsReport from '@/config/js-report'

// const { qs } = urlParse

const { location } = window

function urlParse(url) {
  try {
    return new URL(url)
  } catch (err) {
    jsReport('URL is not a constructor')
  }
  return {};
}

// // 测试URL
// const schemaUrl = 'haoshiqi://com.doweidu/home?position=topbar&spm=abc123/cxy';
// const h5Url = 'http://10.0.255.231:8000/t.html#ali_zt?channel_id=huabei&d_host=alipay&topic_code=74152227bc6c29ac14ce772abab6aeda&zt_active=20180201_ea0207&spm=huabei/hbcjy227&ref=profile%3Fchannel_id%3Dh5';

// // 解析以上H5, 没有query，格式上不规范，出现问题，需要支持与下面URL解析等效
// // 通过 tempHash 运算兼容处理
// const h5UrlOk = 'http://10.0.255.231:8000/t.html?channel_id=huabei&d_host=alipay&topic_code=74152227bc6c29ac14ce772abab6aeda&zt_active=20180201_ea0207&spm=huabei/hbcjy227&ref=profile%3Fchannel_id%3Dh5#ali_zt'

// h5
// const test11 = 'https://m.haoshiqi.net/#zt_template?topic_code=86cdc05e3067cb7bafed2daf963a22ce' // 专题
// const test12 = 'https://m.beta.haoshiqi.net/#couple_detail?pinactivitiesid=4765&sid=581&channel_id=h5&ref=portal%3F&spm=h5.10.109'
// const test13 = 'http://m.beta.haoshiqi.net/#detail?sid=113'
// const test14 = 'http://m.beta.haoshiqi.net/#merchant?merchantid=101'

// // SCHEME
// const test21 = 'haoshiqi://com.doweidu/sku?skuId=581'
// const test22 = 'haoshiqi://com.doweidu/couplesbuydetail?pinActivityId=4751'
// const test23 = 'haoshiqi://com.doweidu/lotteryactivitylist'
// const test24 = 'haoshiqi://com.doweidu/lotteryactivitydetail?pinActivityId=9041'
// const test26 = 'haoshiqi://com.doweidu/merchant?merchantId=172'
// const test27 = 'haoshiqi://com.doweidu/couplessearch?searchTag=含乳饮品'
// const test28 = 'haoshiqi://com.doweidu/couplescategory?categoryName=含乳饮品'
// const test29 = 'haoshiqi://com.doweidu/activityshare?activityId=1'
// const test210 = 'haoshiqi://com.doweidu/couplessearch?searchTag=含乳饮品'
// haoshiqi://hybrid?compid=haoshiqi&comppage=zl_list

// urlParse(schemaUrl);
// urlParse(h5Url);

// console.log(urlParse(h5Url))

/* eslint no-unused-vars: 0 */
// url 映射规则
const schemaToH5Rules = {
  merchant: {
    target: 'merchant',
    params: {
      merchantId: 'merchantid',
    },
  },
  sku: {
    target: 'detail',
    params: {
      skuId: 'sid',
    },
  },
  couponskulist: {
    target: 'list',
    params: {
      couponId: 'couponid',
    },
  },
  home: {
    target: 'index',
  },
  category: {
    target: 'list',
    params: {
      categoryName: 'categoryname',
      categoryId: 'categoryid',
    },
  },
  search: {
    target: 'list',
    params: {
      searchTag: 'searchtag',
    },
  },
  activityshare: {
    target: 'share',
    params: {
      activityid: 'activityid',
    },
  },
  coupleskulist: {
    target: 'couple_list',
  },
  couplesbuydetail: {
    target: 'couple_detail',
    params: {
      pinActivityId: 'pinactivitiesid',
    },
  },
  couplesinvite: {
    target: 'couple_share',
    params: {
      orderId: 'orderId',
      url: 'url',
    },
  },
  couplessearch: {
    target: 'couple_search_list',
    params: {
      searchTag: 'search',
    },
  },
  couplescategory: {
    target: 'couple_search_list',
    params: {
      categoryName: 'category',
    },
  },
  lotteryactivitylist: {
    target: 'lottery_list',
    params: {},
  },
  lotteryactivitydetail: {
    target: 'lottery_detail',
    params: {
      pinActivityId: 'pinactivitiesid',
    },
  },
  cart: {
    target: 'shopping_cart',
    params: {},
  },
  coupon: {
    target: 'coupon',
    params: {},
  },
  refunddetail: {
    target: 'order_refund_detail',
    params: {
      refundOrderId: 'refundid',
    },
  },
  usercenter: {
    target: 'profile',
    params: {},
  },
  selectprovince: {
    target: 'city',
    params: {},
  },
  openim: {
    target: 'im',
    params: {
      targetId: 'accountid',
      skuId: 'sid',
    },
  },
  inappweb: {
    target: 'iframe_page',
    params: {
      url: 'iframe_url',
    },
  },
  grouppurchaserule: {
    target: 'couple_rules',
    params: {
      // url: '',
    },
  },
  onlineservice: {
    target: 'service',
    params: {
      accountId: 'accountid',
    },
  },
  commentlist: {
    target: 'comment_list',
    params: {
      skuId: 'sid',
    },
  },
  assistanceorderconfirm: {
    target: 'order_commit',
    params: {
      // 参数名称一致，可以缺省
      // activityId: 'activityId',
      // activityEventId: 'activityEventId',
      // orderType: 'orderType',
      // amount: 'amount',
    },
  },
  orderdetail: {
    target: 'order_detail',
    params: {
      orderId: 'orderid',
    },
  },
  groupcouponskulist: {
    target: 'new_product',
    params: {
      couponId: 'couponid',
    },
  },
}
const h5ToTargetRules = {
  portal: {
    target: 'index',
    params: {},
  },
  city: {
    target: 'city',
    params: {},
  },
  profile: {
    target: 'profile',
    params: {},
  },
  ali_portal: {
    target: 'ali_portal',
    params: {},
  },
  ali_profile: {
    target: 'ali_profile',
    params: {},
  },
  zt_template: {
    target: 'zt',
    params: {},
  },
  couple_detail: {
    target: 'couple_detail',
    params: {
      pinactivitiesid: 'id',
    },
  },
  zl_list: {
    target: 'zl_list',
    params: {},
  },
  zl_detail: {
    target: 'zl_detail',
    params: {},
  },
  ali_zt: {
    target: 'ali_zt',
    params: {

    },
  },
  ali_detail: {
    target: 'ali_detail',
    params: {
      pSkuId: 'id',
    },
  },
}
const schemaToTargetRules = {
  home: {
    target: 'index',
    params: {},
  },
  couplesbuydetail: {
    target: 'detail',
    params: {
      pinActivityId: 'id',
    },
  },
  // couplesinvite: {
  //   target: 'couple_share',
  //   params: {
  //     orderId: 'orderId',
  //     url: 'url'
  //   }
  // },
  // usercenter: {
  //   target: 'profile',
  //   params: {},
  // },
}

// 逆向转换映射规则
function reverseRules(rule) {
  const targetRules = {}
  const { hasOwnProperty } = Object.prototype
  for (const key in rule) {
    if (hasOwnProperty.call(rule, key)) {
      const item = rule[key]
      targetRules[item.target] = {
        target: key,
        params: {},
      }

      for (const key2 in item.params) {
        if (hasOwnProperty.call(item.params, key2)) {
          const param = item.params[key2]
          targetRules[item.target].params[param] = key2
        }
      }
    }
  }

  return targetRules
}

const targetToH5Rules = reverseRules(h5ToTargetRules)
const targetToSchemaRules = reverseRules(schemaToTargetRules)

const rules = {
  schemaToH5Rules,
  h5ToTargetRules,
  schemaToTargetRules,
  targetToH5Rules,
  targetToSchemaRules,
}

/**
 * 获取url类型
 * 暂时不支持跳转 schema 链接
 *
 * @param {any} url [schema, h5, mini, other]
 */
// const miniSchemaType = /^(https?:)?\/\//i
const miniUrlType = /&page=pages\//i
const schemaType = /^haoshiqi:\/\/com.doweidu\//i
const schemaAlipay = /^alipays:\/\/platformapi\/startapp/i
const hybridType = /^haoshiqi:\/\/hybrid\?compid=haoshiqi&comppage=/i
// const hsqH5Type = /^(https?:)?\/\//i
const h5Type = /^(https?:)?\/\//i
const h5New = /^\/[a-z]+/i

export function getUrlType(url) {
  if (schemaType.test(url)) return 'schema'
  if (hybridType.test(url)) return 'hybrid'
  if (h5Type.test(url)) return 'h5'  // 暂时笼统判断都是hsq Url
  if (miniUrlType.test(url)) return 'mini'
  if (url.indexOf('/') === -1) return 'target'
  if (schemaAlipay.test(url)) return 'schemaAlipay'
  // if (miniUrlType.test(url)) return 'new'
  return 'other'
}

export function queryMap(params = {}, target = {}) {
  for (const key in params) {
    if (target[key]) {
      params[target[key]] = params[key]
      delete params[key]
    }
  }
  // 暂时不要 ref，这个需要两次 encode，否则其中的?会打断参数
  delete params.ref
  return params
}

export function getParams(nextUrl = '', targetUrl) {
  const url1 = !nextUrl ? {} : hashUrl(nextUrl)
  const url2 = typeof targetUrl === 'undefined' ? hashUrl(location.href) : {}
  return { ...url2.query, ...url1.query }
}

export function hashUrl(url) {
  if (!url) return {}
  let localUrl = {}
  if (url.indexOf('/') === -1) {
    localUrl = {
      hash: url,
    }
  } else {
    localUrl = urlParse(url)
  }

  let {
    hash = '',
    pathname = '/',
    search = '',
  } = localUrl
  if (pathname.indexOf('/') === 0) {
    pathname = pathname.substr(1)
  }
  // 兼容 query 前的 hash
  const tempHash = hash.split('?')
  hash = tempHash[0].replace('#', '')
  const tempQuery = tempHash[1] || ''
  const query = Object.assign({}, qs.parse(tempQuery), qs.parse(search.replace('?', '')))
  return {
    pathname,
    hash,
    query,
  }
}

function getTargetUrl(url = '', targetType = 'target') {
  // url = test11;
  // url = test12;
  // url = test22;

  // 获取url，直接拼好参数
  const urlType = getUrlType(url)

  const targetRules = rules[camelCase(`${urlType}-to-${targetType}-rules`)]
  if (!targetRules && urlType !== 'schemaAlipay') {
    console.error(`不存在rules ${targetRules}`)
  }
  /* eslint prefer-const: 0 */
  let {
    hash = '',
    pathname = '',
    query = '',
  } = hashUrl(url)
  let path
  let pageMap = {}
  switch (urlType) {
    case 'schema':
      path = pathname || 'home'
      path = path.replace('/com.doweidu/', '')
      pageMap = targetRules[path] || {}
      query = queryMap(query, pageMap.params)
      break
    case 'h5':
      path = hash || 'index'
      pageMap = targetRules[path] || {}
      query = queryMap(query, pageMap.params)
      break
    case 'target':
      // 跳转新版页面，但此页面还不存在
      path = hash || 'index'
      pageMap = targetRules[path] || {}
      query = queryMap(query, pageMap.params)
      break;
    case 'mini':
    case 'hybrid':
    case 'schemaAlipay':
      break
    default:
      // do nothing...
  }
  if (!pageMap.target) {
    console.log(`urlMap 不存在: ${url}`)
    location.href = url
  }
  return {
    query,
    page: pageMap.target,
  }
}

export default getTargetUrl
