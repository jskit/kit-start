// 正则验证

export function isvalidUsername(str) {
  return true;
  // const validMap = ['admin', 'editor']
  // return validMap.indexOf(str.trim()) >= 0
}

// 合法uri
export function validateURL(textval) {
  /* eslint max-len: 0 */
  const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlRegex.test(textval);
}

// 小写字母
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

// 大写字母
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

// validate email
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// 邮箱
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
}

// 手机号码
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s);
}

// 电话号码
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

// URL地址
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

export const regMobile = /^(1[3-9][0-9])\d{8}$/;

export const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regMobileCode = /^(\d{6}|\d{4})$/;

export const regChinese = /^[\u4e00-\u9fff]{0,}$/;
