// copy & clone
export function clone(obj = '') {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

export function isUnDef(v) {
  return v === 'undefined' || v === null;
}
export function isDef(v) {
  return v !== 'undefined' && v !== null;
}
export function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

// function uuid1(userId) {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     const r = Math.random() * 16 | 0
//     const v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   })//.toUpperCase();
// }

// exports.url =
//   '_~0123456789' +
//   'abcdefghijklmnopqrstuvwxyz' +
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// https://github.com/ai/nanoid/blob/master/non-secure.js
export function random(size) {
  const result = [];
  while (0 < size--) {
    result.push(Math.floor(Math.random() * 256));
  }
  return result;
}

export function uuid(size = 21) {
  const url =
    '_~getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ';
  let id = '';
  let bytes = [];
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    bytes = crypto.getRandomValues(new Uint8Array(size));
    console.warn(':::uuid crypto:', bytes.join(','));
  } else {
    bytes = random(size);
    console.warn(':::uuid random:', bytes.join(','));
  }
  // const bytes = typeof crypto !== 'undefined' && crypto.getRandomValues ?
  //   crypto.getRandomValues(new Uint8Array(size)) :
  //   random(size);
  while (0 < size--) {
    id += url[bytes[size] & 63];
  }
  return id;
}

export function compact(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'undefined') delete obj[key];
  }
  return obj;
}

export function loadImg(img) {
  return require(`@/assets/img/${img}`);
}

export function stringify(params, options = {}) {
  const opts = Object.assign({ delimiter: '&' }, options);
  const { delimiter = '&' } = opts;

  const arr = [];
  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    } else {
      arr.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  }
  return arr.join(delimiter);
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function throttle(func, wait, options) {
  /* eslint no-multi-assign: 0 */
  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;

  if (!options) options = {};
  const later = () => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  return (...rest) => {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = rest;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

// 设置灰度模式
export const toggleGrayMode = status => {
  if (status) {
    document.body.className += ' gray-mode';
  } else {
    document.body.className = document.body.className.replace(' gray-mode', '');
  }
};

// 获取uuid
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(
      16
    );
  });
}

// 是否有权限
export function isAuth(key) {
  return (
    JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !==
      -1 || false
  );
}

export function menuLevel(data, id = 'id', pid = 'parentId') {
  const temp = {};
  /* eslint no-underscore-dangle: 0 */
  function mapMenu(list = [], level = 1) {
    list.forEach(item => {
      item._level = level;
      temp[item[id]] = item;
      if (item.children) {
        mapMenu(item.children, level + 1);
      }
    });
  }

  mapMenu(data);
  return data;
}

// 树形数据转换
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  const res = [];
  const temp = {};
  // 遍历目录
  for (let i = 0; i < data.length; i++) {
    // const item = data[i];
    // const menuId = item[id];
    // temp[menuId] = item;
    temp[data[i][id]] = data[i];
  }

  for (let k = 0; k < data.length; k++) {
    const item = data[k];
    const parentId = item[pid]; // data[k][pid]
    const parentItem = temp[parentId]; // temp[data[k][pid]]
    if (parentItem && item[id] !== parentId) {
      if (!parentItem.children) {
        parentItem.children = [];
      }
      /* eslint no-underscore-dangle: 0 */
      if (!parentItem._level) {
        parentItem._level = 1;
      }
      item._level = parentItem._level + 1;
      parentItem.children.push(item);
    } else {
      res.push(item);
    }
  }
  // debugger
  return res;
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time, 10) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a')
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
/* eslint no-control-regex: 0 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
  ).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;
  setTimeout(() => {
    console.log(new Date());
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date(new Date().toDateString());
      end.setTime(start.getTime());
      picker.$emit('pick', [start, end]);
    },
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    },
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    },
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    },
  },
];

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

export function debounce(func, wait, immediate) {
  let timeout;
  let args;
  let context;
  let timestamp;
  let result;

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          args = null;
          context = args;
        }
      }
    }
  };

  return (...rest) => {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, rest);
      rest = null;
      context = rest;
    }

    return result;
  };
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    /* eslint no-return-assign: 0 */
    return hit || (cache[str] = fn(str));
  };
}

// 以下简单转化命名格式

/**
 * Camelize a hyphen-delimited string.
 * camelCase 小驼峰命名
 */
const camelizeRE = /-(\w)/g;
const camelize = cached(function(str) {
  /* eslint func-names: 0 */
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Converts the first character of string to upper case.
 * 首字母大写
 */
const capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 * kebabCase 连字符命名 eg: kebab-case
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export const upperFirst = capitalize;
export const kebabCase = hyphenate;
export const camelCase = camelize;

export function merge(target) {
  /* eslint no-plusplus: 0 */
  /* eslint prefer-rest-params: 0 */
  /* eslint no-prototype-builtins: 0 */
  /* eslint no-param-reassign: 0 */
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {};
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}

export function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

// compareVersion('1.11.0', '1.9.9')
