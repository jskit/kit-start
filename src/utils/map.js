
// const map = Array.prototype.map
// 提取参数
// test:
// var aa = [{a: 1,b:2},{a:3, b:4}]
// map(aa, 'a')
// [2, 3]
function map(arr, key) {
  return arr.map(item => item[key])
}

// 构建数据映射
// 因为使用组件模板，在共用时，数据结构需要调整，所以需要构建映射关系
// 暂时只是浅处理
// var aa = [{a: 1,b:2},{a:3, b:4}]
// mapTo(aa, {a: 'c'})
function mapTo(arr, options = {}) {
  return arr.map((item) => {
    // 如果是函数，处理数据
    if (typeof options === 'function') {
      return options(item)
    }
    for (const key in options) {
      // 建议渲染使用数据，简单处理映射，大的运算可以后处理，如点击事件等
      if (typeof options[key] === 'string') {
        // 如果是字符串，做映射
        /* eslint no-param-reassign: 0 */
        item[options[key]] = item[key]
      } else if (typeof options[key] === 'function') {
        return options[key](item)
      }
    }
    return item
  })
}

export default {
  map,
  mapTo,
}
