import { isArray, isObject, isString, isNumber } from './is';

/**
 * 获取对象
 * @param {*} obj
 * @param {string} key
 * @returns Object
 */
export function getModel(obj, key) {
  if (obj && obj[key]) {
    if (isObject(obj[key])) {
      return obj[key];
    } else {
      return null;
    }
  }
  return null;
}
/**
 * 获取数组
 * @param {*} obj
 * @param {string} key
 * @returns Object
 */
export function getArray(obj, key) {
  if (obj && obj[key]) {
    if (isArray(obj[key])) {
      return obj[key];
    } else {
      return new Array(obj[key]);
    }
  }
  return [];
}
/**
 * 获取字符串直接用来页面展示
 * @param {*} obj
 * @param {string} key
 * @returns String
 */
export function getString(obj, key) {
  if (obj && obj[key]) {
    if (isString(obj[key])) {
      return obj[key];
    } else {
      return obj[key] + '';
    }
  } else {
    return '';
  }
}
/**
 * 获取Boolean值进行数据判断
 * @param {*} obj
 * @param {string} key
 * @returns Boolean
 */
export function getBoolean(obj, key) {
  if (obj && obj[key] && obj[key] === '0') {
    return true;
  } else {
    return false;
  }
}

/**
 * 获取Int值进行数据判断
 * @param {*} obj
 * @param {string} key
 * @returns Int
 */
export function getInt(obj, key) {
  if (obj && obj[key]) {
    if (isNumber(obj[key])) {
      return obj[key];
    } else {
      const temp = parseInt(obj[key], 10);
      if (temp === 'NaN') {
        return 0;
      }
      return temp;
    }
  } else {
    return 0;
  }
}
/**
 * 获取 Number
 * @param {*} obj
 * @param {string} key
 * @returns Number
 */
export function getNumber(obj, key) {
  if (obj && obj[key]) {
    if (isNumber(obj[key])) {
      return obj[key];
    } else {
      const temp = parseFloat(obj[key]);
      if (temp === 'NaN') {
        return 0;
      } else {
        return temp;
      }
    }
  } else {
    return 0;
  }
}
// 获取价格进行直接显示
/**
 * 获取价格进行直接显示
 * @param {*} obj
 * @param {string} key
 */
export function getPrice(obj, key) {
  const price = getNumber(obj, key);
  if (typeof price === 'string') {
    return price;
  }
  return getPriceValue(price);
}

export function getPriceValue(value) {
  if (value) {
    value = value.toFixed(2) + '';

    let endStr = value.substr(value.length - 3, value.length);
    if (endStr === '.00') {
      value = value.substr(0, value.length - 3);
    }
    endStr = value.substr(value.length - 1, value.length);
    if (endStr === '0') {
      const pos = value.lastIndexOf('.');
      if (pos > 0 && pos + 3 === value.length) {
        value = value.substr(0, value.length - 1);
      }
    }
    return value;
  } else {
    return '0';
  }
}
