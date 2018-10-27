/**
 * 获取url类型
 * 问题：h5任意域名只要pathname匹配的上，都可以匹配到schema；改成好食期h5匹配好食期schema，确定是对应的h5链接再做转换，否则不做转换
 * h5和schema需要区分
 * @param {any} url [schema, h5, miniapp, other]
 */

// 当前站点判断
import env from '@/config/env';

const types = {
  currentH5Site: env.regBaseUrl,
  schemaMsf: /^mishifeng:\/\/native\//i,
  miniapp: /^miniapp:\/\//i,
  // h5打开支付宝小程序
  alipays: /^alipays:\/\/platformapi\/startapp/i,
  // 专题
  h5Topic: /(topic(\.dev|\.beta)?\.doweidu\.com)/i,
  h5: /^(https|http):\/\//i,
  // 手机号，h5用a标签写，不走事件，小程序走事件
  tel: /^tel:/i,
  // 领优惠券
  jsCoupon: /javascript\:tpBridge.getCoupon\(\'(.*?)\'\)/,
};

// 注意匹配顺序，topic必须在h5之前
export function getUrlType(url) {
  if (types['currentH5Site'].test(url)) return 'currentH5Site';
  if (types['schemaMsf'].test(url)) return 'schemaMsf';
  if (types['miniapp'].test(url)) return 'miniapp';
  if (types['alipays'].test(url)) return 'alipays';
  if (types['h5Topic'].test(url)) return 'h5Topic';
  if (types['h5'].test(url)) return 'h5';
  if (types['tel'].test(url)) return 'tel';
  if (types['jsCoupon'].test(url)) return 'jsCoupon';
  return 'other';
}

export default getUrlType;
