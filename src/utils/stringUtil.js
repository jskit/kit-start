
function stringify(params = {}) {
  const temp = params
  const arr = []
  for (const key in params) {
    if (!temp[key]) {
      delete temp[key]
    } else {
      arr.push(`${key}=${temp[key]}`)
    }
  }
  return arr.join('&')
}

function getQueryString(url, name) { // 获取URL参数
  if (!url) {
    return null
  }
  const reg = new RegExp('(^|)' + name + '=([^&]*)')
  const r = url.match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function urlfix(url, paramsUrl = '') {
  let fixUrl = url;
  if (paramsUrl) {
    fixUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + paramsUrl;
  }
  return fixUrl;
}

const mini = {
  urlfix,
  stringify,
  getQueryString,
}

export default mini

