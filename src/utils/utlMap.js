
// import urlParse from './url-parse/index'
import qs from 'qs'

// const { qs } = urlParse

function urlParse(url) {
  return new URL(url)
}

// // 测试URL
// const schemaUrl = 'haoshiqi://com.doweidu/home?position=topbar&spm=abc123/cxy';
// const h5Url = 'http://10.0.255.231:8000/t.html#ali_zt?channel_id=huabei&d_host=alipay&topic_code=74152227bc6c29ac14ce772abab6aeda&zt_active=20180201_ea0207&spm=huabei/hbcjy227&ref=profile%3Fchannel_id%3Dh5';

// // 解析以上H5, 没有query，格式上不规范，出现问题，需要支持与下面URL解析等效
// // 通过 tempHash 运算兼容处理
// const h5UrlOk = 'http://10.0.255.231:8000/t.html?channel_id=huabei&d_host=alipay&topic_code=74152227bc6c29ac14ce772abab6aeda&zt_active=20180201_ea0207&spm=huabei/hbcjy227&ref=profile%3Fchannel_id%3Dh5#ali_zt';

// // h5
// const test11 = 'https://m.haoshiqi.net/#zt_template?topic_code=86cdc05e3067cb7bafed2daf963a22ce'; // 专题
// const test12 = 'https://m.beta.haoshiqi.net/#couple_detail?pinactivitiesid=4765&sid=581&channel_id=h5&ref=portal%3F&spm=h5.10.109';
// const test13 = 'http://m.beta.haoshiqi.net/#detail?sid=113';
// const test14 = 'http://m.beta.haoshiqi.net/#merchant?merchantid=101';

// // SCHEME
// const test21 = 'haoshiqi://com.doweidu/sku?skuId=581';
// const test22 = 'haoshiqi://com.doweidu/couplesbuydetail?pinActivityId=4751';
// const test23 = 'haoshiqi://com.doweidu/lotteryactivitylist';
// const test24 = 'haoshiqi://com.doweidu/lotteryactivitydetail?pinActivityId=9041';
// const test26 = 'haoshiqi://com.doweidu/merchant?merchantId=172';
// const test27 = 'haoshiqi://com.doweidu/couplessearch?searchTag=含乳饮品';
// const test28 = 'haoshiqi://com.doweidu/couplescategory?categoryName=含乳饮品';
// const test29 = 'haoshiqi://com.doweidu/activityshare?activityId=1';
// const test210 = 'haoshiqi://com.doweidu/couplessearch?searchTag=含乳饮品';

// urlParse(schemaUrl);
// urlParse(h5Url);

// console.log(urlParse(h5Url))

// url 映射规则
const h5toMiniRules = {
  portal: {
    target: 'index',
    params: {},
  },
  zt_template: {
    target: 'zt2',
    params: {},
  },
  couple_detail: {
    target: 'detail',
    params: {
      pinactivitiesid: 'id',
      // sid: 'sid', // 不必要参数
    },
  },
  // couple_share: {
  //   target: 'couple_share',
  //   params: {},
  // },
  // profile: {
  //   target: 'profile',
  //   params: {},
  // },
}
const schemaToMiniRules = {
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
function reverseRules(rules) {
  const miniRules = {}
  const { hasOwnProperty } = Object.prototype
  for (const key in rules) {
    if (hasOwnProperty.call(rules, key)) {
      const item = rules[key]
      miniRules[item.target] = {
        na: key,
        params: {}
      }

      for (const key2 in item.params) {
        if (hasOwnProperty.call(item.params, key2)) {
          const param = item.params[key2]
          miniRules[item.target].params[param] = key2
        }
      }
    }
  }

  return miniRules
}

const miniToH5Rules = reverseRules(h5toMiniRules)
const miniToSchemaRules = reverseRules(schemaToMiniRules)

console.log(miniToH5Rules)
console.log(miniToSchemaRules)

/**
 * 获取url类型
 * 暂时不支持跳转 schema 链接
 *
 * @param {any} url [schema, h5, mini, other]
 */
// const miniSchemaType = /^(https?:)?\/\//i
const miniUrlType = /&page=pages\//i
const schemaType = /^haoshiqi:\/\//i
// const hsqH5Type = /^(https?:)?\/\//i
const h5Type = /^(https?:)?\/\//i

function getUrlType(url) {
  if (schemaType.test(url)) return 'schema'
  if (h5Type.test(url)) return 'h5'  // 暂时笼统判断都是hsq Url
  if (miniUrlType.test(url)) return 'mini'
  return 'other'
}

function queryMap(params = {}, target = {}) {
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

function getMiniUrl(url = '') {
  // url = test11;
  // url = test12;
  // url = test22;

  // 获取小程序url，直接拼好参数
  const urlType = getUrlType(url)
  const localUrl = urlParse(url)
  let {
    hash = '',
    pathname = '/',
    query = '',
  } = localUrl
  pathname = pathname.substr(1)
  // 兼容 query 前的 hash
  const tempHash = hash.split('?')
  hash = tempHash[0].replace('#', '')
  const tempQuery = tempHash[1] || ''
  console.log(query)
  query = Object.assign({}, qs.parse(tempQuery), qs.parse(query))
  let path
  let pageMap = {}
  // let target
  switch (urlType) {
    case 'schema':
      path = pathname || 'home'
      pageMap = schemaToMiniRules[path] || {}
      query = queryMap(query, pageMap.params)
      break
    case 'h5':
      path = hash || 'portal'
      pageMap = h5toMiniRules[path] || {}
      query = queryMap(query, pageMap.params)
      break
    case 'mini':
      break
    default:
      // do nothing...
  }
  return {
    query,
    page: pageMap.target,
  }
}

export default getMiniUrl
