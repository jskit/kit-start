/**
 * 数组工具
 *
 * @param {*}
 * @returns
 */

/**
 * 数组转换为对象
 *
 * @param {*} [arr=[]]
 * @param {*} key string // 自定义对象key
 * @returns Object
 */
export function arrayToObject(arr = [], key) {
  let tempObj = {};
  let tempKey = 0;
  arr.forEach(item => {
    let currKey = key ? item[key] : tempKey;
    tempObj[currKey] = item;
    tempKey++;
  });
  return tempObj;
}

/**
 * 数组去重
 *
 * @export
 * @param {*} tempArray
 * @param {*} key
 * @returns
 */
export function arrayToHeavy(tempArray = [], key) {
  if (key) {
    const obj = {};
    const newArray = tempArray.reduce((cur, next) => {
      if (next && !obj[next[key]]) {
        obj[next[key]] = true && cur.push(next);
      }
      return cur;
    }, []);
    return newArray;
  } else {
    return [...new Set(tempArray)];
  }
}

/**
 * 提取参数
 * const map = Array.prototype.map
 * var aa = [{a: 1,b:2},{a:3, b:4}]
 * map(aa, 'a')
 * [1, 3]
 * @param {*} arr
 * @param {*} key
 * @returns array
 */
export function map(arr, key) {
  return arr.map(item => item[key]);
}

// 构建数据映射
// 因为使用组件模板，在共用时，数据结构需要调整，所以需要构建映射关系
// 暂时只是浅处理
// var aa = [{a: 1,b:2},{a:3, b:4}]
// mapTo(aa, {a: 'c'})

/**
 * 构建数据映射
 * 因为使用组件模板，在共用时，数据结构需要调整，所以需要构建映射关系
 * 暂时只是浅处理
 *
 * @param {*} arr
 * @param {*} [options={}]
 * @returns array
 */
export function mapTo(arr, options = {}) {
  return arr.map(item => {
    // 如果是函数，处理数据
    if (typeof options === 'function') {
      return options(item);
    }
    for (const key in options) {
      // 建议渲染使用数据，简单处理映射，大的运算可以后处理，如点击事件等
      if (typeof options[key] === 'string') {
        // 如果是字符串，做映射
        /* eslint no-param-reassign: 0 */
        item[options[key]] = item[key];
      } else if (typeof options[key] === 'function') {
        return options[key](item);
      }
    }
    return item;
  });
}

const arrayUtil = {
  arrayToObject,
  arrayToHeavy,
  map,
  mapTo,
};

export default arrayUtil;
