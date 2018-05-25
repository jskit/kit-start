
export function host(url) {
  const hostUrl = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = hostUrl.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    // ~ 是按位取反 ~~ 取反两次，就是去掉小数部分
    // 因为位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数
    // 出了 ~~n 外，n<<0 n>>0 n|0 都可以取整
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function formatDel(value, pre = '') {
  // 返回处理后的值
  if (!value) return null
  return `${pre}${Number(value * 0.01).toFixed(2)}`
}
