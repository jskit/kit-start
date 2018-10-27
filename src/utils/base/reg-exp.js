/**
 * regExp options
 * 正则项
 */

const RegExps = {
  email: /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/,
  mobile: /^(1[3-8][0-9])\d{8}$/,
  mobileCode: /^(\d{6}|\d{4})$/,
  // URL的一般格式为： scheme://host:port/path?query#fragment
  httpUrl: /^https+:\/\//,
  english: /^[A-Za-z]+$/,
  zip: /^[1-9]\d{5}$/,
};

/**
 * 判断是否符合正则规则
 *
 * @export
 * @param {*} <text> string
 * @param {*} [reg]
 * @returns boolean
 */
export function isAgreeRegExp(text, type, reg) {
  const tempRegExp = reg || RegExps[type];
  if (tempRegExp) {
    return tempRegExp.test(text);
  }
}

export default {
  isAgreeRegExp,
};
