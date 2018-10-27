/**
 * 数据判断
 * @export
 * @param {*} value
 * @returns boolean
 */

// is数组
export function isArray(ar) {
  return Array.isArray(ar);
}

// is布尔
export function isBoolean(arg) {
  return typeof arg === 'boolean';
}

// is 是否有值
export function isDef(value) {
  return value !== undefined && value !== null;
}

// is Null
export function isNull(arg) {
  return arg === null;
}

// is Null or undefined
export function isNullOrUndefined(arg) {
  return arg == null;
}

// is 数值
export function isNumber(arg) {
  return typeof arg === 'number';
}

// is 字符
export function isString(arg) {
  return typeof arg === 'string';
}

// is 独一无二的值 ES6 原始数据类型
export function isSymbol(arg) {
  return typeof arg === 'symbol';
}

// is undefined
export function isUndefined(arg) {
  return arg === void 0;
}

// is 正则
export function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

// is 对象
export function isObject(arg) {
  return typeof arg === 'object' && objectToString(arg) === '[object Object]';
}

// is 空对象
export function isEmptyObject(obj) {
  if (isObject(obj)) {
    if (JSON.stringify(obj) === '{}') {
      return false;
    }
  }
  return true;
}

// is 日期对象
export function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

// is 错误
export function isError(e) {
  return (
    isObject(e) &&
    (objectToString(e) === '[object Error]' || e instanceof Error)
  );
}

// is 方法
export function isFunction(arg) {
  return typeof arg === 'function';
}

export function isPrimitive(arg) {
  // ES6 symbol
  return (
    arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' ||
    typeof arg === 'undefined'
  );
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

// 对象自身属性中是否具有指定的属性
export function isHasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

const isUtil = {
  isArray,
  isBoolean,
  isDef,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp,
  isObject,
  isEmptyObject,
  isDate,
  isError,
  isFunction,
  isPrimitive,
  isHasOwnProperty,
};

export default isUtil;
