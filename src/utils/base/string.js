/**
 * 字符串操作
 *
 * @param {*} [*]
 * @returns
 */

/**
 * 字符串化参数
 *
 * @export
 * @param {*} [params={}]
 * @returns 'key=val&key1=val1'
 */
export function stringify(params = {}) {
  const temp = params;
  const arr = [];
  for (const key in params) {
    if (!temp[key]) {
      delete temp[key];
    } else {
      arr.push(`${key}=${temp[key]}`);
    }
  }
  return arr.join('&');
}

/**
 * 去处字符串空格
 *
 * @export
 * @param {string} [str='']
 * @param {boolean} [isGlobal=false] // 默认去除前后空格，true 去除全部空格
 * @returns string
 */
export function trim(str = '', isGlobal = false) {
  let result;
  result = str.replace(/(^\s+)|(\s+$)/g, '');
  if (isGlobal) {
    result = result.replace(/\s/g, '');
  }
  return result;
}

/**
 * 获取URL参数
 *
 * @export
 * @param {*} url
 * @param {*} name
 * @returns
 */
export function getQueryString(url, name) {
  if (!url) {
    return null;
  }
  const reg = new RegExp('(^|)' + name + '=([^&]*)');
  const r = url.match(reg);
  if (r != null) return unescape(r[2]); // 因为 unescape 已经废弃，建议使用 decodeURI或者decodeURIComponent 替代本方法。
  return null;
}

/**
 * 正则替换url spm 参数
 *
 * @param {*} url
 * @param {*} spm
 * @returns string
 */
export function replaceSPM(url, spm) {
  if (!url) {
    return null;
  }
  const reg = new RegExp('(^|)spm=([^&]*)');
  const r = url.match(reg);
  if (r != null) {
    let old = unescape(r[0]);
    if (old) {
      return url.replace(old, 'spm=' + spm);
    }
  }
  if (url.indexOf('spm=') < 0) {
    if (url.indexOf('?') > 0) {
      url += url + '&spm=' + spm;
    } else {
      url += url + '?spm=' + spm;
    }
  }
  return url;
}

/**
 * url 链接后添加字符串
 *
 * @param {*} url
 * @param {string} [paramsUrl='']
 * @returns string
 */
export function urlfix(url, paramsUrl = '') {
  let fixUrl = url;
  if (paramsUrl) {
    fixUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + paramsUrl;
  }
  return fixUrl;
}

/**
 * 字符串截取 添加 三个点
 *
 * @param {*} value
 * @param {*} length
 * @returns string
 */
export function addPoint(value, length) {
  if (value.length > length) {
    return value.substr(0, length - 1) + '...';
  } else {
    return value;
  }
}

/**
 * 从html字符串中匹配<img>标签，再匹配src属性
 * @param {*} html
 * @param {*} isGlobal
 * @returns array
 */
export function regImgs(html = '', isGlobal) {
  // 匹配图片（g表示匹配所有结果i表示区分大小写）
  const imgReg = new RegExp('<img.*?(?:>|/>)', isGlobal ? 'ig' : 'i');
  // 匹配src属性
  const srcReg = /src=['"]?([^'"]*)['"]?/i;
  const arr = html.match(imgReg);
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const src = arr[i].match(srcReg);
    // 获取图片地址
    if (src[1]) {
      result.push(src[1]);
      // alert('已匹配的图片地址'+(i+1)+'：'+src[1]);
    }
  }

  return result;
}

const stringUtil = {
  stringify,
  trim,
  getQueryString,
  replaceSPM,
  urlfix,
  addPoint,
  regImgs,
};

export default stringUtil;
