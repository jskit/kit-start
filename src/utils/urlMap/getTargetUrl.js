/**
 * 获取url转换对应映射
 * @param {any} targetUrl
 */
import qs from 'qs';
import getUrlType from './urlType';
import urlRules from './urlRule';

function urlParse(url) {
  try {
    return new URL(url);
  } catch (err) {
    console.warn('URL is not a constructor');
  }
  return {};
}

export function queryMap(params = {}, target = {}) {
  for (const key in params) {
    if (target[key]) {
      params[target[key]] = params[key];
      delete params[key];
    }
  }
  // 暂时不要 ref，这个需要两次 encode，否则其中的?会打断参数
  delete params.ref;
  return params;
}

export function getParams(nextUrl = '', targetUrl) {
  const url1 = !nextUrl ? {} : hashUrl(nextUrl);
  const url2 = typeof targetUrl === 'undefined' ? hashUrl(location.href) : {};
  return { ...url2.query, ...url1.query };
}

export function hashUrl(url) {
  if (!url) return {};
  let localUrl = {};
  if (url.indexOf('/') === -1) {
    localUrl = {
      hash: url,
    };
  } else {
    localUrl = urlParse(url);
  }

  let { hash = '', pathname = '/', search = '' } = localUrl;
  if (pathname.indexOf('/') === 0) {
    pathname = pathname.substr(1);
  }
  // 兼容 query 前的 hash
  const tempHash = hash.split('?');
  hash = tempHash[0].replace('#', '');
  const tempQuery = tempHash[1] || '';
  const query = Object.assign(
    {},
    qs.parse(tempQuery),
    qs.parse(search.replace('?', ''))
  );
  for (let key in query) {
    if (Array.isArray(query[key])) {
      query[key] = query[key][0] || '';
    }
  }
  return {
    pathname,
    hash,
    query,
  };
}

export function camelCase(str) {
  return str.replace(/-(\w)/g, function(_, c) {
    return c ? c.toUpperCase() : '';
  });
}

export function getTargetUrl(url = '', targetType) {
  // 获取url，直接拼好参数
  const urlType = getUrlType(url);
  const targetRules = urlRules[camelCase(`${urlType}-to-${targetType}`)];
  if (!targetRules) {
    console.error(`不存在rules ${targetRules}`);
  }
  /* eslint prefer-const: 0 */
  let { hash = '', pathname = '', query = '' } = hashUrl(url);
  let path;
  let pageMap = {};
  switch (urlType) {
    case 'schemaMsf':
      path = pathname || 'index';
      path = path.replace('/native/', '');
      pageMap = targetRules[path] || {};
      query = queryMap(query, pageMap.params);
      break;
    case 'h5Msf':
      path = hash || 'index';
      pageMap = targetRules[path] || {};
      query = queryMap(query, pageMap.params);
      break;
    case 'mini':
    case 'hybrid':
    case 'schemaAlipay':
      break;
    default:
    // do nothing...
  }
  // if (!pageMap.target) {
  //   console.log(`urlMap 不存在: ${url}`);
  //   location.href = url;
  // }
  return {
    query,
    page: pageMap.target,
  };
}

export default getTargetUrl;
